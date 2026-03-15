# Doctor Portal Backend API Specifications

This document outlines the RESTful API endpoints required for the Doctor Portal.

## Base URL
`http://localhost:5001/api`

## Architecture
**Technology Stack:** Python (Flask)
**Database Architecture:** A **Single, Shared MySQL Database** is used across all three portals (Patient, Doctor, Pharmacy). The `UHID` (Universal Health ID) serves as the primary key linking patient demographics, doctor visits, and pharmacy prescriptions within this unified MySQL database.

---

## 1. Authentication Endpoints

### `POST /auth/login`
- **Purpose**: Authenticates a doctor and returns a JWT.
- **Body**: `{ "email": "doctor@healthconnect.com", "password": "..." }`
- **Response**: `200 OK` with JWT token and doctor profile.

---

## 2. Dashboard Endpoints

### `GET /doctor/dashboard`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves aggregated statistics and the schedule for the logged-in doctor.
- **Response**: `{ stats: { total_patients_seen, today_visits, prescriptions_written, pending_tasks }, appointments: [...] }`

---

## 3. Patient Interaction Endpoints (Single DB Query)

### `GET /patients/search`
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**: `?q=search_term` (Can be Name, Phone, or UHID)
- **Purpose**: Searches for patients in the shared registry.
- **Response**: Array of matching patient profiles.

### `GET /patients/:uhid`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves full patient demographics plus their visit history with the current doctor.
- **Response**: Detailed patient profile, visit history, and prescriptions.

---

## 4. Clinical Records Endpoints

### `POST /visits`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Records a new clinical visit.
- **Body**: `{ uhid, vitals, symptoms, diagnosis, notes }`
- **Response**: `201 Created` with the new visit record.

### `GET /visits/:uhid`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves visit history for a specific patient.
- **Response**: Array of visit records.

---

## 5. Prescription Endpoints

### `POST /prescriptions`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Generates a new digital prescription and an RX code.
- **Body**: `{ uhid, visit_id, medicines: [{ name, dosage, duration, instructions }] }`
- **Response**: `201 Created` with generated `rx_code`.

### `GET /prescriptions/:uhid`
- **Headers**: `Authorization: Bearer <token>`
- **Purpose**: Retrieves all prescriptions written for a specific patient.
- **Response**: Array of prescriptions.
