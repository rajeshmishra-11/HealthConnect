# 📋 Rajesh Kumar Mishra — Backend Developer Task Sheet

**Project:** HealthConnect 
**Role:** Backend API Development & Documentation  
**Tech Stack:** Flask, Flask-RESTful, Flask-JWT-Extended, SQLAlchemy, MySQL  
**Base URL:** `http://localhost:5000`

---

## 📌 Table of Contents

1. [Project Setup](#-1-project-setup)
2. [Authentication APIs (accounts)](#-2-authentication-apis--accounts-app)
3. [Patient APIs (patients)](#-3-patient-apis--patients-app)
4. [Doctor APIs (doctors)](#-4-doctor-apis--doctors-app)
5. [Pharmacy APIs (pharmacy)](#-5-pharmacy-apis--pharmacy-app)
6. [Admin APIs (core)](#-6-admin-apis--core-app)
7. [Documentation Tasks](#-7-documentation-tasks)
8. [AI Prompts for Implementation](#-8-ai-prompts-for-building-each-endpoint)

---

## � Backend File Structure

```
medTech-backend/
├── manage.py                          ← Entry point
├── requirements.txt                   ← Python dependencies
├── .env                               ← Environment variables
│
├── medtech/                           ← Project config
│   ├── __init__.py
│   ├── settings.py                    ← Django/Flask settings, DB config, JWT config
│   ├── urls.py                        ← Root URL routing
│   ├── wsgi.py                        ← WSGI entry point
│   └── asgi.py                        ← ASGI entry point
│
├── accounts/                          ← 🔐 Authentication & Users
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← User model (email-based, role field)
│   ├── serializers.py                 ← Register, Login, Profile serializers
│   ├── views.py                       ← register, login, profile, request-otp, forgot-password
│   ├── urls.py                        ← /api/auth/* routes
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
├── patients/                          ← 👤 Patient Profiles & Records
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← Patient model (UHID, demographics, medical info)
│   ├── serializers.py                 ← Patient profile & search serializers
│   ├── views.py                       ← patient_profile, patient_records, patient_prescriptions
│   ├── urls.py                        ← /api/patient/* routes
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
├── doctors/                           ← 🩺 Doctor Module
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← Doctor, Visit, Appointment models
│   ├── serializers.py                 ← Doctor, Visit, Prescription serializers
│   ├── views.py                       ← search_patient, patient_details, create_visit, create_prescription, appointments
│   ├── urls.py                        ← /api/doctor/* routes
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
├── prescriptions/                     ← 💊 E-Prescriptions
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← Prescription, PrescriptionItem models (rx_code, validity)
│   ├── serializers.py                 ← Prescription & PrescriptionItem serializers
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
├── pharmacy/                          ← 🏪 Pharmacy Module
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← Pharmacy, DispenseLog models
│   ├── serializers.py                 ← Pharmacy & DispenseLog serializers
│   ├── views.py                       ← verify_prescription, dispense_prescription, history
│   ├── urls.py                        ← /api/pharmacy/* routes
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
├── records/                           ← 📁 Medical Records
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py                      ← MedicalRecord model (lab, scan, discharge, etc.)
│   ├── serializers.py                 ← MedicalRecord serializer
│   ├── admin.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
│
└── core/                              ← ⚙️ Admin, Utilities & Shared
    ├── __init__.py
    ├── apps.py
    ├── models.py                      ← Hospital, AuditLog models
    ├── serializers.py                 ← Hospital & AuditLog serializers
    ├── views.py                       ← admin_stats, HospitalViewSet, audit_logs
    ├── admin_urls.py                  ← /api/admin/* routes
    ├── permissions.py                 ← IsPatient, IsDoctor, IsPharmacy, IsAdmin
    ├── utils.py                       ← generate_uhid, generate_rx_code, hash_govt_id, create_audit_log
    ├── admin.py
    └── migrations/
        ├── __init__.py
        └── 0001_initial.py
```

---

## �🛠 1. Project Setup

### How to run:
```bash
cd medTech-backend
python -m venv venv
source venv/bin/activate         # Linux/Mac
pip install -r requirements.txt
flask db upgrade                 # Run migrations
flask run                        # Starts on port 5000
```

### Key Dependencies (`requirements.txt`):
- `Flask`, `Flask-RESTful`, `Flask-JWT-Extended`, `Flask-SQLAlchemy`
- `Flask-Migrate`, `Flask-CORS`, `Flask-Marshmallow`, `python-dotenv`
- `PyMySQL` or `mysqlclient` (MySQL driver)

### Authentication:
All protected endpoints use **JWT Bearer Token**:
```
Authorization: Bearer <access_token>
```

### Roles:
| Role       | Access Level                              |
|------------|-------------------------------------------|
| `patient`  | Own profile, records, prescriptions       |
| `doctor`   | Search patients, create visits/Rx         |
| `pharmacy` | Verify & dispense prescriptions           |
| `admin`    | Dashboard stats, hospital CRUD, audit logs|

---

## 🔐 2. Authentication APIs — `accounts` Blueprint

**Prefix:** `/api/auth/`

### 2.1 `POST /api/auth/register/`
**Permission:** Public (`AllowAny`)  
**Purpose:** Register a new patient user account.

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "password": "securePass123",
  "dob": "1995-05-15",
  "gender": "M",
  "govt_id": "AABCX1234Y"
}
```

| Field     | Type   | Required | Notes                      |
|-----------|--------|----------|----------------------------|
| name      | string | ✅       | Full name                  |
| email     | string | ✅       | Must be unique             |
| phone     | string | ✅       | Min 10 digits              |
| password  | string | ✅       | Min 6 characters           |
| dob       | date   | ❌       | Format: YYYY-MM-DD         |
| gender    | string | ❌       | Choices: `M`, `F`, `O`    |
| govt_id   | string | ❌       | Hashed via SHA-256 + salt  |

**Success (201):**
```json
{
  "message": "Registration successful",
  "user": { "id": 1, "email": "rajesh@example.com", "role": "patient" },
  "patient": { "uhid": "HID-A7B3-K9M2", "name": "Rajesh Kumar" },
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

**Errors (400):** Validation errors (duplicate email, short password, etc.)

**Key Logic:**
- Auto-generates UHID via `core.utils.generate_uhid()` → Format: `HID-XXXX-XXXX`
- Hashes `govt_id` via SHA-256 before storing
- Creates both `User` (role=patient) and `Patient` profile

---

### 2.2 `POST /api/auth/login/`
**Permission:** Public (`AllowAny`)  
**Purpose:** Authenticate user, return JWT tokens.

**Request Body:**
```json
{
  "email": "rajesh@example.com",
  "password": "securePass123",
  "role": "patient"
}
```

| Field    | Type   | Required | Notes                                    |
|----------|--------|----------|------------------------------------------|
| email    | string | ✅       |                                          |
| password | string | ✅       |                                          |
| role     | string | ❌       | Optional validation: `patient`/`doctor`/`pharmacy`/`admin` |

**Success (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1, "email": "rajesh@example.com",
    "phone": "9876543210", "role": "patient", "is_verified": false
  },
  "patient": { "uhid": "HID-A7B3-K9M2", "name": "Rajesh Kumar" },
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

**Notes:**
- For `doctor` role → adds `doctor` object with `id`, `name`, `specialty`
- For `patient` role → adds `patient` object with `uhid`, `name`
- Updates `last_login` timestamp
- Creates audit log entry

---

### 2.3 `GET /api/auth/profile/`
**Permission:** `IsAuthenticated`  
**Purpose:** Get current user's profile with role-specific data.

**Success (200):**
```json
{
  "user": {
    "id": 1, "email": "rajesh@example.com",
    "phone": "9876543210", "role": "patient",
    "is_verified": false, "created_at": "...", "last_login": "..."
  },
  "patient": { "id": 1, "uhid": "HID-A7B3-K9M2", "name": "...", ... }
}
```

---

### 2.4 `POST /api/auth/request-otp/`
**Permission:** Public (`AllowAny`)  
**Purpose:** Request OTP for phone-based login.

**Request Body:**
```json
{ "phone": "9876543210" }
```

**Success (200):**
```json
{
  "message": "OTP sent successfully",
  "otp_sent": true,
  "phone": "******3210"
}
```

**Errors:** Invalid phone, account not found.

---

### 2.5 `POST /api/auth/forgot-password/`
**Permission:** Public (`AllowAny`)  
**Purpose:** Initiate password reset flow.

**Request Body:**
```json
{ "email": "rajesh@example.com" }
```

**Success (200):** Always returns success to prevent email enumeration:
```json
{
  "message": "If an account exists with this email, a password reset link will be sent."
}
```

---

### 2.6 `POST /api/auth/token/refresh/`
**Permission:** Public  
**Purpose:** Refresh an expired JWT access token.

**Request Body:**
```json
{ "refresh": "<jwt_refresh_token>" }
```

**Success (200):**
```json
{ "access": "<new_jwt_access_token>" }
```

---

## 👤 3. Patient APIs — `patients` Blueprint

**Prefix:** `/api/patient/`  
**Permission:** `IsAuthenticated` + `IsPatient`

### 3.1 `GET /api/patient/profile/`
**Purpose:** Get patient's own profile.

**Success (200):**
```json
{
  "id": 1, "uhid": "HID-A7B3-K9M2", "name": "Rajesh Kumar",
  "email": "rajesh@example.com", "phone": "9876543210",
  "dob": "1995-05-15", "gender": "M", "age": 30,
  "address": "", "city": "", "state": "", "pincode": "",
  "emergency_contact": "", "blood_group": null,
  "allergies": "", "allergies_list": [],
  "chronic_conditions": "", "chronic_conditions_list": [],
  "created_at": "...", "updated_at": "..."
}
```

### 3.2 `PUT /api/patient/profile/`
**Purpose:** Update patient profile (partial update supported).

**Request Body (partial):**
```json
{
  "name": "Rajesh K.",
  "blood_group": "O+",
  "allergies": "Penicillin, Dust",
  "emergency_contact": "9876541111",
  "phone": "9999999999"
}
```

**Updatable Fields:** `name`, `dob`, `gender`, `address`, `city`, `state`, `pincode`, `emergency_contact`, `blood_group`, `allergies`, `chronic_conditions`, `phone`

---

### 3.3 `GET /api/patient/records/`
**Purpose:** Get patient's medical records with optional filters.

**Query Params:**

| Param     | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| dateFrom  | string | Filter from date (YYYY-MM-DD)                 |
| dateTo    | string | Filter to date (YYYY-MM-DD)                   |
| type      | string | `lab`, `scan`, `discharge`, `prescription`, `vaccination`, `surgery`, `other`, `all` |

**Example:** `GET /api/patient/records/?type=lab&dateFrom=2025-01-01`

---

### 3.4 `GET /api/patient/prescriptions/`
**Purpose:** Get patient's prescriptions.

**Query Params:**

| Param  | Type   | Description                            |
|--------|--------|----------------------------------------|
| status | string | `pending`, `dispensed`, `expired`       |

---

## 🩺 4. Doctor APIs — `doctors` Blueprint

**Prefix:** `/api/doctor/`  
**Permission:** `IsAuthenticated` + `IsDoctor`

### 4.1 `GET /api/doctor/search/`
**Purpose:** Search patient by Health ID, phone, or government ID.

**Query Params:**

| Param | Type   | Required | Values                            |
|-------|--------|----------|-----------------------------------|
| type  | string | ✅       | `healthId`, `phone`, `govtId`     |
| value | string | ✅       | The search value                  |

**Example:** `GET /api/doctor/search/?type=healthId&value=HID-A7B3-K9M2`

**Success (200):**
```json
{
  "found": true,
  "patients": [
    { "id": 1, "uhid": "HID-A7B3-K9M2", "name": "Rajesh Kumar", "age": 30, "gender": "M" }
  ]
}
```

**Not Found (200):**
```json
{ "found": false, "patients": [], "message": "No patient found with the given criteria" }
```

---

### 4.2 `GET /api/doctor/patients/<patient_id>/`
**Purpose:** Get full patient details including medical history & prescriptions.

**Example:** `GET /api/doctor/patients/1/`

**Success (200):**
```json
{
  "patient": {
    "id": 1, "uhid": "HID-A7B3-K9M2", "name": "...",
    "recent_visits": [ { "id": 1, "symptoms": "...", "diagnosis": "...", ... } ]
  },
  "prescriptions": [ { "id": 1, "rx_code": "RX-A7B3K9M2", ... } ]
}
```

---

### 4.3 `POST /api/doctor/visits/`
**Purpose:** Create a new patient visit/consultation record.

**Request Body:**
```json
{
  "patient_id": 1,
  "symptoms": "Fever, headache, body ache",
  "diagnosis": "Viral fever",
  "notes": "Rest advised for 3 days",
  "vitals": {
    "blood_pressure_systolic": 120,
    "blood_pressure_diastolic": 80,
    "pulse": 78,
    "temperature": 101.2,
    "weight": 72.5,
    "height": 175.0,
    "oxygen_saturation": 97
  }
}
```

| Field      | Type   | Required | Notes                         |
|------------|--------|----------|-------------------------------|
| patient_id | int    | ✅       | Must exist in DB              |
| symptoms   | string | ✅       |                               |
| diagnosis  | string | ✅       |                               |
| notes      | string | ❌       |                               |
| vitals     | object | ❌       | All vitals fields are optional|

---

### 4.4 `POST /api/doctor/prescriptions/`
**Purpose:** Create an e-prescription with medicines.

**Request Body:**
```json
{
  "patient_id": 1,
  "visit_id": 1,
  "diagnosis": "Viral fever",
  "notes": "Complete the course",
  "medicines": [
    {
      "medicine_name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "3x daily",
      "duration": "5 days",
      "quantity": 15,
      "instructions": "After meals"
    },
    {
      "medicine_name": "Cetirizine",
      "dosage": "10mg",
      "frequency": "1x daily",
      "duration": "3 days",
      "quantity": 3,
      "instructions": "Before bed"
    }
  ]
}
```

| Field      | Type   | Required | Notes                                        |
|------------|--------|----------|----------------------------------------------|
| patient_id | int    | ✅       |                                              |
| visit_id   | int    | ❌       | Link to an existing visit                    |
| diagnosis  | string | ✅       |                                              |
| notes      | string | ❌       |                                              |
| medicines  | array  | ✅       | Min 1 item. Each has name, dosage, frequency, duration |
| valid_days | int    | ❌       | Default: 30. Sets `valid_until` date          |

**Key Logic:**
- Auto-generates `rx_code` → Format: `RX-XXXXXXXX`
- Creates `Prescription` + `PrescriptionItem` entries
- Sets `valid_until = today + valid_days`

---

### 4.5 `GET /api/doctor/appointments/`
**Purpose:** Get doctor's appointments for today.

**Success (200):**
```json
{
  "date": "2026-03-08",
  "total": 5,
  "appointments": [
    {
      "id": 1, "patient": 1, "patient_name": "...",
      "patient_uhid": "HID-...", "date": "2026-03-08",
      "time": "10:00:00", "status": "scheduled", "notes": ""
    }
  ]
}
```

---

## 💊 5. Pharmacy APIs — `pharmacy` Blueprint

**Prefix:** `/api/pharmacy/`  
**Permission:** `IsAuthenticated` + `IsPharmacy`

### 5.1 `GET /api/pharmacy/verify/<rx_code>/`
**Purpose:** Verify a prescription by its RX code before dispensing.

**Example:** `GET /api/pharmacy/verify/RX-A7B3K9M2/`

**Success (200):**
```json
{
  "is_valid": true,
  "message": "Prescription is valid",
  "prescription": {
    "id": 1, "rx_code": "RX-A7B3K9M2",
    "patient_name": "Rajesh Kumar", "patient_uhid": "HID-...",
    "doctor_name": "Dr. Sharma", "hospital_name": "City Hospital",
    "diagnosis": "Viral fever", "status": "pending",
    "items": [
      { "medicine_name": "Paracetamol", "dosage": "500mg", "frequency": "3x daily", ... }
    ],
    "valid_until": "2026-04-07"
  }
}
```

**Invalid cases:**
- `is_valid: false` → Already dispensed / Cancelled / Expired

---

### 5.2 `POST /api/pharmacy/dispense/<rx_code>/`
**Purpose:** Mark a prescription as dispensed.

**Request Body:**
```json
{ "notes": "All medicines dispensed. Patient advised on dosage." }
```

**Key Logic:**
- Sets prescription `status` to `dispensed`
- Records `dispensed_at`, `dispensed_by` (pharmacy)
- Creates `DispenseLog` entry
- Creates audit log

---

### 5.3 `GET /api/pharmacy/history/`
**Purpose:** Get dispensing history for the pharmacy.

**Query Params:**

| Param  | Type   | Description                |
|--------|--------|----------------------------|
| date   | string | Filter by date (YYYY-MM-DD)|

**Success (200):**
```json
{
  "today_count": 12,
  "history": [
    {
      "id": 1, "prescription": { ... },
      "dispensed_by": 3, "notes": "...", "dispensed_at": "..."
    }
  ]
}
```

---

## 🏥 6. Admin APIs — `core` Blueprint

**Prefix:** `/api/admin/`  
**Permission:** `IsAuthenticated` + `IsAdmin`

### 6.1 `GET /api/admin/stats/`
**Purpose:** Get dashboard statistics.

**Success (200):**
```json
{
  "hospitals": 5,
  "doctors": 12,
  "pharmacies": 3,
  "patients": 150,
  "prescriptions_today": 22,
  "total_prescriptions": 1500
}
```

---

### 6.2 Hospital CRUD — Flask-RESTful Resource

| Method   | Endpoint                      | Purpose            |
|----------|-------------------------------|--------------------|
| `GET`    | `/api/admin/hospitals/`       | List all hospitals |
| `POST`   | `/api/admin/hospitals/`       | Create hospital    |
| `GET`    | `/api/admin/hospitals/<id>/`  | Get hospital       |
| `PUT`    | `/api/admin/hospitals/<id>/`  | Update hospital    |
| `PATCH`  | `/api/admin/hospitals/<id>/`  | Partial update     |
| `DELETE` | `/api/admin/hospitals/<id>/`  | Delete hospital    |

**List Filters (query params):** `?status=active&type=government`

**Hospital Object:**
```json
{
  "id": 1,
  "name": "City General Hospital",
  "type": "government",
  "registration_number": "REG-12345",
  "address": "123 Main Street",
  "city": "Lucknow",
  "state": "Uttar Pradesh",
  "pincode": "226001",
  "phone": "0522-1234567",
  "email": "info@cityhospital.com",
  "status": "active"
}
```

**Type choices:** `government`, `private`, `clinic`, `nursing_home`  
**Status choices:** `active`, `inactive`, `suspended`

---

### 6.3 `GET /api/admin/logs/`
**Purpose:** Get system audit logs.

**Query Params:**

| Param    | Type   | Description                 |
|----------|--------|-----------------------------|
| action   | string | Filter by action type       |
| user     | int    | Filter by user ID           |
| dateFrom | string | From date (YYYY-MM-DD)      |
| dateTo   | string | To date (YYYY-MM-DD)        |

**Action Types:** `login`, `logout`, `register`, `view_record`, `create_record`, `create_prescription`, `dispense`, `search_patient`, `update_profile`, `admin_action`

---

## 📖 7. Documentation Tasks

### 7.1 API Documentation (`DOCUMENTATION.md`)
- [ ] Document all endpoint URLs, methods, and permissions
- [ ] Add request/response examples for each endpoint
- [ ] Document error codes and validation rules
- [ ] Add authentication flow explanation (JWT)
- [ ] Document role-based access matrix

### 7.2 Setup Guide
- [ ] Environment variables reference (`.env.example`)
- [ ] Database setup steps (MySQL configuration & migrations)
- [ ] Deployment instructions

### 7.3 API Testing Guide
- [ ] Postman/Insomnia collection with all endpoints
- [ ] Sample test data for each role

---

## 🤖 8. AI Prompts for Building Each Endpoint

Below are copy-paste-ready **AI prompts** you can use to build or modify each endpoint:

---

### Prompt 1 — Register API
```
Create a Flask API endpoint for user registration at POST /api/auth/register/.
Use Flask-RESTful or a simple route with Flask Blueprint.
It should accept JSON body: name, email, phone, password, dob (optional), gender (optional, choices M/F/O), govt_id (optional).
It should:
1. Validate email uniqueness and phone format (min 10 digits) using Marshmallow or manual validation.
2. Create a User model (SQLAlchemy) with role='patient' and email-based auth.
3. Hash password using werkzeug.security.generate_password_hash().
4. Auto-generate a UHID in format HID-XXXX-XXXX using secrets module.
5. Hash govt_id using SHA-256 with a salt before storing.
6. Create a Patient profile linked to the User.
7. Return JWT access/refresh tokens using Flask-JWT-Extended (create_access_token, create_refresh_token).
8. Create an audit log entry for the registration.
No auth required for this route. Return 201 on success, 400 on validation error.
```

---

### Prompt 2 — Login API
```
Create a Flask login endpoint at POST /api/auth/login/.
Accept JSON body: email, password, and optional role field.
It should:
1. Query User model by email and verify password using werkzeug.security.check_password_hash().
2. Validate role if provided (reject if user role doesn't match).
3. Update last_login timestamp via SQLAlchemy.
4. Generate JWT tokens using Flask-JWT-Extended (create_access_token, create_refresh_token).
5. Return role-specific data: patient={uhid,name} or doctor={id,name,specialty}.
6. Create an audit log entry.
No auth required for this route.
```

---

### Prompt 3 — Patient Profile API
```
Create a Flask endpoint at /api/patient/profile/ supporting GET and PUT.
Use @jwt_required() decorator from Flask-JWT-Extended + custom is_patient check using get_jwt_identity().
GET: Return full patient profile from SQLAlchemy with computed fields (age, allergies_list, chronic_conditions_list).
PUT: Accept JSON body, allow partial update of name, dob, gender, address, city, state, pincode, emergency_contact, blood_group, allergies, chronic_conditions, phone.
If phone is updated, also update user.phone.
Create audit log on profile update.
```

---

### Prompt 4 — Patient Records API
```
Create a Flask GET endpoint at /api/patient/records/ for fetching medical records.
Use @jwt_required() + is_patient role check.
Filter by query params (request.args): dateFrom (date >=), dateTo (date <=), type (lab/scan/discharge/prescription/vaccination/surgery/other/all).
Query MedicalRecord model via SQLAlchemy, return JSON with hospital_name and type_display.
```

---

### Prompt 5 — Doctor Search Patient API
```
Create a Flask GET endpoint at /api/doctor/search/ for doctors to search patients.
Use @jwt_required() + is_doctor role check.
Accept query params (request.args): type (healthId/phone/govtId), value.
For healthId: filter Patient.uhid using ilike() in SQLAlchemy.
For phone: filter User.phone using .contains().
For govtId: hash the value using SHA-256 and compare against govt_id_hash column.
Return limited patient info: id, uhid, name, age, gender.
Create audit log with search_type and results_count.
```

---

### Prompt 6 — Doctor Create Visit API
```
Create a Flask POST endpoint at /api/doctor/visits/ to record a patient visit.
Use @jwt_required() + is_doctor role check.
Accept JSON body: patient_id, symptoms, diagnosis, notes (optional), vitals (optional object with BP systolic/diastolic, pulse, temperature, weight, height, oxygen_saturation).
Get doctor from current user identity via get_jwt_identity() and query Doctor model.
Validate patient_id exists in SQLAlchemy.
Create Visit record (db.session.add + db.session.commit) linked to patient and doctor.
Return JSON visit with patient_name, patient_uhid, doctor_name, blood_pressure formatted string.
Create audit log.
```

---

### Prompt 7 — Doctor Create Prescription API
```
Create a Flask POST endpoint at /api/doctor/prescriptions/ to create an e-prescription.
Use @jwt_required() + is_doctor role check.
Accept JSON body: patient_id, visit_id (optional), diagnosis, notes (optional), medicines (array, min 1), valid_days (optional, default 30).
Each medicine has: medicine_name, dosage, frequency, duration, quantity (optional), instructions (optional).
Auto-generate rx_code in format RX-XXXXXXXX using secrets module, ensure uniqueness via SQLAlchemy query.
Set valid_until = today + timedelta(days=valid_days).
Create Prescription + PrescriptionItem entries (db.session.add_all + db.session.commit).
Create audit log with rx_code.
```

---

### Prompt 8 — Pharmacy Verify Prescription API
```
Create a Flask GET endpoint at /api/pharmacy/verify/<rx_code>/ for prescription verification.
Use @jwt_required() + is_pharmacy role check.
Lookup Prescription by rx_code.upper() via SQLAlchemy.
Check validity: already dispensed → invalid, cancelled → invalid, expired → invalid, past valid_until → mark as expired and return invalid.
Return JSON with is_valid boolean, message, and full prescription data with items, patient name, doctor name, hospital name.
```

---

### Prompt 9 — Pharmacy Dispense API
```
Create a Flask POST endpoint at /api/pharmacy/dispense/<rx_code>/ to mark a prescription as dispensed.
Use @jwt_required() + is_pharmacy role check.
Accept optional JSON body with notes.
Validate: not already dispensed, not expired.
Update prescription via SQLAlchemy: status='dispensed', dispensed_at=datetime.utcnow(), dispensed_by=pharmacy.
Create DispenseLog entry (db.session.add + db.session.commit).
Create audit log with rx_code, patient_id, pharmacy_id.
```

---

### Prompt 10 — Admin Stats API
```
Create a Flask GET endpoint at /api/admin/stats/ for admin dashboard.
Use @jwt_required() + is_admin role check.
Use SQLAlchemy db.session.query(...).count() to return counts: active hospitals, active doctors, active pharmacies, total patients, prescriptions_today, total_prescriptions.
```

---

### Prompt 11 — Hospital CRUD API
```
Create a Flask-RESTful Resource for Hospital at /api/admin/hospitals/ and /api/admin/hospitals/<id>/.
Use @jwt_required() + is_admin role check.
Support full CRUD:
- GET /hospitals/ → list all (with optional query param filters: status, type)
- POST /hospitals/ → create new
- GET /hospitals/<id>/ → get single
- PUT /hospitals/<id>/ → full update
- PATCH /hospitals/<id>/ → partial update
- DELETE /hospitals/<id>/ → delete
Hospital SQLAlchemy model fields: name, type (government/private/clinic/nursing_home), registration_number (unique), address, city, state, pincode, phone, email, status (active/inactive/suspended).
```

---

### Prompt 12 — Admin Audit Logs API
```
Create a Flask GET endpoint at /api/admin/logs/ for viewing audit logs.
Use @jwt_required() + is_admin role check.
Filter by query params (request.args): action, user (user_id), dateFrom, dateTo.
Build SQLAlchemy query with .filter() chaining. Limit to 100 entries with .limit(100).
Action types: login, logout, register, view_record, create_record, create_prescription, dispense, search_patient, update_profile, admin_action.
```

---

## ✅ Endpoint Checklist Summary

| #  | Method   | Endpoint                           | App           | Status |
|----|----------|------------------------------------|---------------|--------|
| 1  | `POST`   | `/api/auth/register/`              | accounts      | ✅ Done |
| 2  | `POST`   | `/api/auth/login/`                 | accounts      | ✅ Done |
| 3  | `GET`    | `/api/auth/profile/`               | accounts      | ✅ Done |
| 4  | `POST`   | `/api/auth/request-otp/`           | accounts      | ✅ Done |
| 5  | `POST`   | `/api/auth/forgot-password/`       | accounts      | ✅ Done |
| 6  | `POST`   | `/api/auth/token/refresh/`         | accounts      | ✅ Done |
| 7  | `GET`    | `/api/patient/profile/`            | patients      | ✅ Done |
| 8  | `PUT`    | `/api/patient/profile/`            | patients      | ✅ Done |
| 9  | `GET`    | `/api/patient/records/`            | patients      | ✅ Done |
| 10 | `GET`    | `/api/patient/prescriptions/`      | patients      | ✅ Done |
| 11 | `GET`    | `/api/doctor/search/`              | doctors       | ✅ Done |
| 12 | `GET`    | `/api/doctor/patients/<id>/`       | doctors       | ✅ Done |
| 13 | `POST`   | `/api/doctor/visits/`              | doctors       | ✅ Done |
| 14 | `POST`   | `/api/doctor/prescriptions/`       | doctors       | ✅ Done |
| 15 | `GET`    | `/api/doctor/appointments/`        | doctors       | ✅ Done |
| 16 | `GET`    | `/api/pharmacy/verify/<rx_code>/`  | pharmacy      | ✅ Done |
| 17 | `POST`   | `/api/pharmacy/dispense/<rx_code>/`| pharmacy      | ✅ Done |
| 18 | `GET`    | `/api/pharmacy/history/`           | pharmacy      | ✅ Done |
| 19 | `GET`    | `/api/admin/stats/`                | core          | ✅ Done |
| 20 | `CRUD`   | `/api/admin/hospitals/`            | core          | ✅ Done |
| 21 | `GET`    | `/api/admin/logs/`                 | core          | ✅ Done |

---

> **Note:** All API responses are in JSON format via `flask.jsonify()`. CORS is configured via `Flask-CORS` for `http://localhost:5173` (frontend dev server). The Flask server runs on port `5000` by default.
