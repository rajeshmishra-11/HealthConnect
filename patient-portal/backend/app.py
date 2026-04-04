from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models import db
from src.config import Config
from flask_jwt_extended import JWTManager

# Load environment variables
load_dotenv()

def create_app():
    # Serve static files from the React frontend build folder
    frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
    app = Flask(__name__, static_folder=frontend_dist)
    CORS(app)

    app.config.from_object(Config)

    # Ensure upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    db.init_app(app)
    jwt = JWTManager(app)

    with app.app_context():
        db.create_all()

    @app.route('/api/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        if path.startswith('api/'):
            return jsonify({"message": "API endpoint not found"}), 404
        
        # Check if the path is a real static file (e.g. assets/main.js)
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
            
        # Otherwise, return index.html for React Router to handle
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/api')
    def api_index():
        return jsonify({"message": "HealthConnect API Root endpoint"})

    # Blueprints registration
    from routes.auth import auth_bp
    from routes.patient import patient_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patient_bp, url_prefix='/api/patient')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
