from flask import Blueprint, jsonify
import state

sos_bp = Blueprint("sos", __name__)

@sos_bp.route("/sos", methods=["POST"])
def trigger_sos():
    """Manual SOS override from the Mobile/Web UI."""
    state.emergency_state = True
    print("🚨 SOS ACTIVATED MANUALLY")
    return jsonify({"status": "emergency_active", "emergency": True})