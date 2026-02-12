from flask import Blueprint, jsonify, Response
from vision.model.service import get_model_summary
from vision.stream_yolo import generate_frames  # Import the new function

vision_bp = Blueprint("vision", __name__)

@vision_bp.route("/health", methods=["GET"])
def vision_health():
    """Returns the operational status of the vision system."""
    return jsonify({"vision": "ok"})

@vision_bp.route("/model/summary", methods=["GET"])
def vision_model_summary():
    """Returns YOLO training configuration."""
    return jsonify(get_model_summary())

# --- NEW ROUTE: VIDEO STREAM ---
@vision_bp.route("/video_feed")
def video_feed():
    """Streams the YOLO processed video to the frontend."""
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')