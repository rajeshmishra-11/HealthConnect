# HealthConnect Patient Portal Backend (Flask)

This is the backend for the HealthConnect Patient Portal, implemented using Python Flask.

## Development Prompt
> Develop a Python Flask REST API for a healthcare patient portal. Integrate with a PostgreSQL database using SQLAlchemy. Implement JWT authentication (Flask-JWT-Extended), CORS support, and structured routing. Follow professional PEP 8 standards and ensure exhaustive error handling for medical data integrity.

## Base Project Structure
- `app.py`: Application factory and entry point.
- `routes/`: Blueprint-based route definitions (auth, patient).
- `models/`: SQLAlchemy database models.
- `services/`: Business logic and database operations.
- `utils/`: Helper functions (UHID generation, security).

## Quick Start
1. Create a virtual environment: `python -m venv venv`
2. Activate: `source venv/bin/activate`
3. Install: `pip install -r requirements.txt`
4. Run: `python app.py`
