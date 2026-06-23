import state
from gpio.alertControl import trigger_alert

CROWD_DANGER_LIMIT = 5

def evaluate_and_alert(people_count, accident_detected):
    """
    Core Decision Engine: Updates system state based on live CV detections.
    """
    if accident_detected:
        state.accident_state = "YES"
        state.emergency_state = True
        state.brightness_level = "100"
        trigger_alert() # Triggers software simulation
    elif people_count > CROWD_DANGER_LIMIT:
        state.accident_state = "NO"
        state.crowd_state = "HIGH"
        state.occupancy_state = "YES"
        state.brightness_level = "100"
    elif people_count > 0:
        state.accident_state = "NO"
        state.crowd_state = "NORMAL"
        state.occupancy_state = "YES"
        state.brightness_level = "60"
    else:
        state.accident_state = "NO"
        state.crowd_state = "NORMAL"
        state.occupancy_state = "NO"
        state.brightness_level = "OFF"