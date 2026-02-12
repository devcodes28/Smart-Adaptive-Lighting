from flask import Blueprint, jsonify

from vision.model.service import get_model_summary

# Define the vision blueprint
vision_bp = Blueprint("vision", __name__)


@vision_bp.route("/health", methods=["GET"])
def vision_health():
    """Returns the operational status of the vision system."""
    return jsonify({"vision": "ok"})


@vision_bp.route("/model/summary", methods=["GET"])
def vision_model_summary():
    """Returns YOLO training configuration and latest model artifact info."""
    return jsonify(get_model_summary())
