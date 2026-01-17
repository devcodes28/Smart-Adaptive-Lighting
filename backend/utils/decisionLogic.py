import state
from gpio.alertControl import trigger_alert

CROWD_DANGER_LIMIT = 5

def evaluate_and_alert(people_count, accident_detected):
    """
    Core Decision Engine: Implements Priority levels P0-P3
    P0: Accident/SOS (Highest)
    P1: Overcrowding
    P2: Normal Motion
    P3: No Activity
    """
    if accident_detected:
        state.accident_state = "YES"
        state.emergency_state = True
        trigger_alert() # Triggers physical hardware
    elif people_count > CROWD_DANGER_LIMIT:
        state.crowd_state = "HIGH"
        state.brightness_level = "100%"
    elif people_count > 0:
        state.occupancy_state = "YES"
        state.brightness_level = "60%"
    else:
        state.occupancy_state = "NO"
        state.brightness_level = "OFF"