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
    # --- PRIORITY P0: ACCIDENT DETECTED ---
    if accident_detected:
        state.accident_state = "YES"
        state.emergency_state = True
        # Force max brightness during accident
        state.brightness_level = "100%" 
        trigger_alert() # Triggers physical hardware
        
        # We return early so lighting doesn't get overridden by crowd logic
        return 

    # --- IF NO ACCIDENT: RESET STATUS ---
    # This else block is crucial. It clears the alert if the camera sees nothing.
    else:
        state.accident_state = "NO"
        state.emergency_state = False

    # --- PRIORITY P1: OVERCROWDING ---
    if people_count > CROWD_DANGER_LIMIT:
        state.crowd_state = "HIGH"
        state.occupancy_state = "YES"
        state.brightness_level = "100%"

    # --- PRIORITY P2: NORMAL OCCUPANCY ---
    elif people_count > 0:
        state.crowd_state = "NORMAL"
        state.occupancy_state = "YES"
        state.brightness_level = "60%"

    # --- PRIORITY P3: IDLE / EMPTY ---
    else:
        state.crowd_state = "NORMAL"
        state.occupancy_state = "NO"
        state.brightness_level = "OFF"