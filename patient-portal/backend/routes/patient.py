from flask import Blueprint, request, jsonify, current_app
from models import db, User, MedicalRecord, Prescription, Visit
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import os
from werkzeug.utils import secure_filename
import uuid

patient_bp = Blueprint('patient_bp', __name__)

# ... (existing routes)

@patient_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_record():
    user_id = int(get_jwt_identity())
    
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    if file:
        filename = secure_filename(file.filename)
        # Add uuid to filename to avoid collisions
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
        
        file_url = f"/api/uploads/{unique_filename}"
        
        data = request.form
        category = data.get('category', 'Doctor\'s Note')
        title = data.get('title', 'Uploaded Record')
        date_str = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
        facility = data.get('facility', 'Self Uploaded')
        doctor_name = data.get('doctor_name', 'N/A')
        diagnosis = data.get('diagnosis', '')
        
        try:
            record_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            record_date = datetime.utcnow().date()

        if category == 'Prescription':
            # Create a Prescription entry
            new_record = Prescription(
                patient_id=user_id,
                rx_code=f"UP-{uuid.uuid4().hex[:8].upper()}",
                doctor_name=doctor_name,
                facility=facility,
                issue_date=record_date,
                diagnosis=diagnosis,
                file_url=file_url,
                status='uploaded'
            )
        else:
            # Create a MedicalRecord entry
            # Map category to type
            record_type = 'LAB' if category == 'Test Result' else \
                         'SCRIPT' if category == 'Prescription' else \
                         'DISCHARGE' if category == 'Doctor\'s Note' else 'OTHER'
            
            new_record = MedicalRecord(
                patient_id=user_id,
                date=record_date,
                doctor_name=doctor_name,
                facility=facility,
                type=record_type,
                title=title,
                diagnosis=diagnosis,
                file_url=file_url
            )
            
        db.session.add(new_record)
        db.session.commit()
        
        return jsonify({
            "message": "File uploaded successfully",
            "record": new_record.to_dict()
        }), 201
    
    return jsonify({"message": "Upload failed"}), 500


@patient_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.to_dict()), 200


@patient_bp.route('/profile', methods=['PATCH'])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    updateable_fields = ['name', 'phone', 'gender', 'blood_group', 'address', 'city', 'state', 'pincode', 'emergency_contact']
    
    for field in updateable_fields:
        if field in data:
            setattr(user, field, data[field])
            
    if 'dob' in data and data['dob']:
        try:
            user.dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()
        except ValueError:
            pass # Invalid date format
            
    if 'allergies' in data:
        user.set_allergies(data['allergies'])
    if 'chronic_conditions' in data:
        user.set_chronic_conditions(data['chronic_conditions'])
        
    try:
        db.session.commit()
        return jsonify({"message": "Profile updated successfully", "user": user.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update profile", "error": str(e)}), 500


@patient_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    user_id = int(get_jwt_identity())
    
    records_count = MedicalRecord.query.filter_by(patient_id=user_id).count()
    prescriptions_count = Prescription.query.filter_by(patient_id=user_id).count()
    visits_count = Visit.query.filter_by(patient_id=user_id).count()
    
    # Simple dynamic health score calculation
    health_score = 0
    if records_count > 0 or prescriptions_count > 0 or visits_count > 0:
        calculated_score = 75 + (records_count * 2) + (visits_count * 2) - (prescriptions_count * 3)
        health_score = max(0, min(100, calculated_score))
    
    return jsonify({
        "medical_records": records_count,
        "prescriptions": prescriptions_count,
        "upcoming_visits": visits_count,
        "health_score": health_score
    }), 200


@patient_bp.route('/records', methods=['GET'])
@jwt_required()
def get_records():
    user_id = int(get_jwt_identity())
    records = MedicalRecord.query.filter_by(patient_id=user_id).order_by(MedicalRecord.date.desc()).all()
    return jsonify([r.to_dict() for r in records]), 200


@patient_bp.route('/prescriptions', methods=['GET'])
@jwt_required()
def get_prescriptions():
    user_id = int(get_jwt_identity())
    prescriptions = Prescription.query.filter_by(patient_id=user_id).order_by(Prescription.issue_date.desc()).all()
    return jsonify([p.to_dict() for p in prescriptions]), 200


@patient_bp.route('/visits', methods=['GET'])
@jwt_required()
def get_visits():
    user_id = int(get_jwt_identity())
    visits = Visit.query.filter_by(patient_id=user_id).order_by(Visit.date.desc()).all()
    return jsonify([v.to_dict() for v in visits]), 200


@patient_bp.route('/record/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_record(record_id):
    user_id = int(get_jwt_identity())
    record = MedicalRecord.query.filter_by(id=record_id, patient_id=user_id).first()
    
    if not record:
        return jsonify({"message": "Record not found"}), 404
    
    # Clean up file if it exists
    if record.file_url and record.file_url.startswith('/api/uploads/'):
        filename = record.file_url.split('/')[-1]
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Error deleting file {file_path}: {e}")

    db.session.delete(record)
    db.session.commit()
    return jsonify({"message": "Record deleted successfully"}), 200


@patient_bp.route('/prescription/<int:prescription_id>', methods=['DELETE'])
@jwt_required()
def delete_prescription(prescription_id):
    user_id = int(get_jwt_identity())
    prescription = Prescription.query.filter_by(id=prescription_id, patient_id=user_id).first()
    
    if not prescription:
        return jsonify({"message": "Prescription not found"}), 404
    
    # Clean up file if it exists
    if prescription.file_url and prescription.file_url.startswith('/api/uploads/'):
        filename = prescription.file_url.split('/')[-1]
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Error deleting file {file_path}: {e}")

    db.session.delete(prescription)
    db.session.commit()
    return jsonify({"message": "Prescription deleted successfully"}), 200
