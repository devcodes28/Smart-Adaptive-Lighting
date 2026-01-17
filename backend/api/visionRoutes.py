from flask import Blueprint, jsonify

# Define the vision blueprint
vision_bp = Blueprint("vision", __name__)

@vision_bp.route("/health", methods=["GET"])
def vision_health():
    """Returns the operational status of the vision system."""
    return jsonify({"vision": "ok"})