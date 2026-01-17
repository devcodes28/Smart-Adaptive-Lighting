from flask import Blueprint, jsonify
import state

status_bp = Blueprint("status", __name__)

@status_bp.route("/status", methods=["GET"])
def get_status():
    """Returns the live system state to the dashboard."""
    return jsonify({
        "occupancy": state.occupancy_state,
        "crowd": state.crowd_state,
        "accident": state.accident_state,
        "brightness": state.brightness_level,
        "emergency": state.emergency_state
    })