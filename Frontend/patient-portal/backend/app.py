from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev_key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    @app.route('/')
    def index():
        return jsonify({"message": "HealthConnect Patient Portal Flask API is running"})

    # Blueprints registration (Future)
    # from routes.auth import auth_bp
    # from routes.patient import patient_bp
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')
    # app.register_blueprint(patient_bp, url_prefix='/api/patient')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
