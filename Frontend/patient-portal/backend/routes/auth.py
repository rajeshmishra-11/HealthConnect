from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token
from datetime import datetime
from services.uhid_service import generate_uhid

auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Missing required fields"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 400

    dob = datetime.strptime(data.get('dob'), '%Y-%m-%d').date() if data.get('dob') else None

    new_user = User(
        name=data.get('name', ''),
        email=data['email'],
        phone=data.get('phone'),
        dob=dob,
        gender=data.get('gender'),
        blood_group=data.get('blood_group'),
        govt_id=data.get('govt_id'),
        health_id=generate_uhid()
    )
    new_user.set_password(data['password'])
    
    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=str(new_user.id))
        return jsonify({"message": "User created successfully", "token": access_token, "user": new_user.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create user", "error": str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Missing required fields"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Login successful", "token": access_token, "user": user.to_dict()}), 200

    return jsonify({"message": "Invalid email or password"}), 401
