from flask import Flask
from flask_cors import CORS
from api.statusRoutes import status_bp
from api.sosRoutes import sos_bp #

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable communication with React

    # Register blueprints
    app.register_blueprint(status_bp, url_prefix="/api")
    app.register_blueprint(sos_bp, url_prefix="/api")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)