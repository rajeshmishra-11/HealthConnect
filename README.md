# ATOM TEAM Present HERE!!!

# HealthConnect Ecosystem

HealthConnect is a comprehensive healthcare management platform consisting of four specialized portals designed to streamline interactions between patients, doctors, pharmacies, and hospital administrators.

## Project Structure

This directory contains the entire HealthConnect ecosystem, organized by portal:

```text
Frontend/
├── patient-portal/           # Patient self-service portal
│   ├── frontend/             # React (Vite)
│   └── backend/              # Flask API (SQLite/MySQL)
├── doctor-portal/            # Healthcare provider interface
│   ├── frontend/             # React (Vite)
│   └── backend/              # Flask API (MySQL)
├── pharmacy-portal/          # Pharmacy & prescription management
│   ├── frontend/             # React (Vite)
│   └── backend/              # Flask API (MySQL)
├── hospital-admin-portal/    # Administrative & network management
│   ├── frontend/             # React (Vite)
│   └── backend/              # Flask API (MySQL)
├── database/                 # Database initialization scripts
│   └── database_dump.sql     # Core SQL schema and sample data
└── README.md                 # This file
```

---

## Portals & Features

| Portal | Port (FE / BE) | Key Features |
| :--- | :--- | :--- |
| **Patient Portal** | `3000` / `5000` | Profile management, digital Health ID, prescription history, medical records. |
| **Doctor Portal** | `3001` / `5001` | Patient consultation, digital RX generation, medical record access. |
| **Pharmacy Portal** | `3002` / `5002` | RX verification, medicine dispensing, inventory management. |
| **Hospital Admin** | `3003` / `5003` | Doctor/Pharmacy onboarding, staff management, system analytics. |

---

## Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (Modern HSL colors, Glassmorphism)
- **Icons**: Lucide React
- **State/Routing**: React Router 7, Axios

### Backend
- **Framework**: Python 3 (Flask)
- **Database**: MySQL (Production) / SQLite (Development fallback for Patient Portal)
- **ORM**: SQLAlchemy
- **Security**: JWT (Flask-JWT-Extended), Bcrypt/Scrypt hashing

---

## Local Setup Guide

Follow these steps to run the portals locally:

### 1. Database Setup
1. Install **MySQL Server** and ensure it's running.
2. Create a database named `HealthConnect_Live`.
3. Import the schema and data:
   ```bash
   mysql -u root -p HealthConnect_Live < database/database_dump.sql
   ```

### 2. Backend Setup (Repeat for each portal)
Each portal folder contains a `backend` directory.
1. Navigate to the portal's backend: `cd [portal-name]/backend`
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on existing examples:
   ```env
   DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost/HealthConnect_Live
   SECRET_KEY=your_secret_key
   JWT_SECRET_KEY=your_jwt_key
   ```
5. Run the application:
   ```bash
   python app.py
   ```

### 3. Frontend Setup (Repeat for each portal)
Each portal folder contains a `frontend` directory.
1. Navigate to the portal's frontend: `cd [portal-name]/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Ensure each portal's backend has a correct `.env` file. Common variables include:

- `DATABASE_URL`: Connection string for the MySQL database.
- `SECRET_KEY`: Used for session security.
- `JWT_SECRET_KEY`: Used for authentication tokens.

---

© 2026 HealthConnect Team

