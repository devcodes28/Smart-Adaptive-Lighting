import threading
from flask import Flask
from flask_cors import CORS
from api.statusRoutes import status_bp
from api.sosRoutes import sos_bp
from api.visionRoutes import vision_bp
from vision.main_vision import run_vision_system # Import our new loop

def create_app():
    app = Flask(__name__)
    CORS(app) 

    app.register_blueprint(status_bp, url_prefix="/api")
    app.register_blueprint(sos_bp, url_prefix="/api")
    app.register_blueprint(vision_bp, url_prefix="/api/vision")

    return app

if __name__ == "__main__":
    app = create_app()
    
    # Start the Computer Vision loop in a background thread
    cv_thread = threading.Thread(target=run_vision_system, daemon=True)
    cv_thread.start()
    
    print("🚀 Backend server running on port 5000...")
    
    # CRITICAL: debug=False prevents the background thread from running twice
    app.run(host="0.0.0.0", port=5000, debug=False)