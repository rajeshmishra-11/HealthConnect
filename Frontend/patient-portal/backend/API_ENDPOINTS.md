# HealthConnect Backend API Specifications

This document outlines the RESTful API endpoints required for the Patient Portal.

## Base URL
`http://localhost:5000/api`

## Authentication

### POST `/auth/register`
- **Body**: `{ name, email, password, dob, gender, phone, ... }`
- **Response**: `201 Created` with JWT token.
- **Action**: Generates a new UHID for the patient.

### POST `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `200 OK` with JWT token and user profile.

## Patient Data

### GET `/patient/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Full profile details.

### PATCH `/patient/profile`
- **Body**: `{ phone, address, pincode, allergies, ... }`
- **Response**: Updated profile.

### GET `/patient/stats`
- **Response**: `{ medical_records, prescriptions, upcoming_visits, health_score }`

### GET `/patient/records`
- **Response**: Array of medical records.

### GET `/patient/prescriptions`
- **Response**: Array of prescriptions.

### GET `/patient/visits`
- **Response**: Array of visits/appointments.

## Search (Ecosystem Connectivity)

### GET `/search/patient/:uhid`
- **Response**: Basic patient profile associated with the UHID.
- **Used by**: Doctor and Pharmacy portals (via internal API or shared DB).

## Connectivity Logic
All endpoints are secured via JWT. The `patient_id` is extracted from the JWT payload for all `/patient/*` routes to ensure patients only access their own data.
