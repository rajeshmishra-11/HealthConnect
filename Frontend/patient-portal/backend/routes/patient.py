from flask import Blueprint, request, jsonify
from models import db, User, MedicalRecord, Prescription, Visit
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

patient_bp = Blueprint('patient_bp', __name__)


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


@patient_bp.route('/search/<uhid>', methods=['GET'])
def search_patient_by_uhid(uhid):
    user = User.query.filter_by(health_id=uhid).first()
    if not user:
        return jsonify({"message": "Patient not found"}), 404
    
    return jsonify({
        "name": user.name,
        "health_id": user.health_id,
        "blood_group": user.blood_group,
        "gender": user.gender,
        "age": datetime.utcnow().year - user.dob.year if user.dob else None
    }), 200
