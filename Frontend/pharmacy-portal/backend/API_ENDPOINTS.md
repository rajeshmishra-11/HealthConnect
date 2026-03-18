# Pharmacy Portal Backend API Specifications

This document outlines the RESTful API endpoints required for the Pharmacy Portal.

## Base URL
`http://localhost:5002/api`

## Architecture
**Technology Stack:** Python (Flask)
**Database Architecture:** A **Single, Shared MySQL Database** is used across all three portals (Patient, Doctor, Pharmacy). The `UHID` (Universal Health ID) serves as the primary key linking patient demographics, doctor visits, and pharmacy prescriptions within this unified MySQL database.

---

## 1. Authentication Endpoints

### `POST /auth/login`
- **Purpose**: Authenticates a pharmacist and returns a JWT.
- **Body**: `{ "email": "pharmacy@healthconnect.com", "password": "..." }`
- **Response**: `200 OK` with JWT token and pharmacy profile.

---

## 2. Dashboard Endpoints

### `GET /pharmacy/dashboard`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves aggregated dispensing statistics for the logged-in pharmacy.
- **Response**:
```json
{
  "stats": {
    "verified_today": 12,
    "pending": 5,
    "rejected": 2,
    "total_dispensed": 847
  },
  "recent_activity": [
    {
      "rx_code": "RX-A7B3K9M2",
      "patient_name": "Sarah Jenkins",
      "doctor_name": "Dr. Robert Aris",
      "medicines": "Amoxicillin 500mg, Ibuprofen",
      "time": "10:45 AM",
      "status": "Dispensed"
    }
  ]
}
```

---

## 3. Prescription Verification Endpoints

### `GET /pharmacy/verify/<rx_code>`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Verifies an RX code and returns full prescription details.
- **Response (Valid)**:
```json
{
  "status": "valid",
  "prescription": {
    "rx_code": "RX-A7B3K9M2",
    "patient": { "name": "John Doe", "health_id": "HID-A7B3-K9M2" },
    "doctor": { "name": "Dr. Smith", "specialization": "General Medicine" },
    "date": "2026-03-10",
    "medicines": [
      { "name": "Paracetamol 500mg", "dosage": "1-0-1", "duration": "5 days", "instructions": "After food" },
      { "name": "Amoxicillin 250mg", "dosage": "1-1-1", "duration": "7 days", "instructions": "Before food" }
    ],
    "notes": "Complete the full course"
  }
}
```
- **Response (Invalid)**: `{ "status": "invalid", "message": "Prescription not found" }`
- **Response (Already Dispensed)**: `{ "status": "dispensed", "message": "Already dispensed on 2026-03-09" }`

---

## 4. Dispensing Endpoints

### `POST /pharmacy/dispense/<rx_code>`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Marks a prescription as dispensed. Updates status across all portals.
- **Response**: `{ "status": "success", "message": "Prescription dispensed successfully" }`

---

## 5. Pharmacy Profile Endpoints

### `GET /pharmacy/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves the full profile of the logged-in pharmacy.
- **Response**:
```json
{
  "name": "City Medical Store",
  "license_no": "PH-MH-2024-00451",
  "registration_date": "2018-06-15",
  "owner": "Rajesh Kumar",
  "pharmacist_in_charge": "Dr. Meena Sharma (Regd. No: MPC-45892)",
  "type": "Retail Pharmacy",
  "address": "Shop No. 12, Ground Floor, Sunrise Complex, MG Road, Pune - 411001",
  "city": "Pune",
  "state": "Maharashtra",
  "pincode": "411001",
  "phone": "+91 20 2567 8901",
  "mobile": "+91 98765 43210",
  "email": "citymedical@healthconnect.com",
  "website": "www.citymedicalstore.in",
  "gst_no": "27AABCU9603R1ZM",
  "drug_license_no": "MH-20B-123456 / MH-21B-654321",
  "operating_hours": "Mon–Sat: 8:00 AM – 10:00 PM | Sun: 9:00 AM – 2:00 PM",
  "services": ["Prescription Dispensing", "OTC Medicines", "Health Supplies", "Home Delivery", "Digital RX Verification"],
  "stats": {
    "total_prescriptions": 12847,
    "this_month": 342,
    "active_since_days": 2831,
    "rating": 4.8
  }
}
```

### `PUT /pharmacy/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Updates the pharmacy profile details.
- **Body**:
```json
{
  "name": "City Medical Store",
  "owner": "Rajesh Kumar",
  "phone": "+91 20 2567 8901",
  "mobile": "+91 98765 43210",
  "email": "citymedical@healthconnect.com",
  "website": "www.citymedicalstore.in",
  "address": "Shop No. 12, Ground Floor, Sunrise Complex, MG Road, Pune - 411001",
  "city": "Pune",
  "state": "Maharashtra",
  "pincode": "411001",
  "operating_hours": "Mon–Sat: 8:00 AM – 10:00 PM | Sun: 9:00 AM – 2:00 PM",
  "services": ["Prescription Dispensing", "OTC Medicines", "Health Supplies", "Home Delivery", "Digital RX Verification"]
}
```
- **Response**: `{ "status": "success", "message": "Profile updated successfully" }`
- **Note**: Fields like `license_no`, `drug_license_no`, `gst_no`, and `registration_date` are read-only and cannot be updated via this endpoint.

---

## 6. Backend Directory Structure

```
backend/
├── API_ENDPOINTS.md
├── app.py
├── models/
├── requirements.txt
├── routes/
├── services/
├── src/
└── utils/
```

