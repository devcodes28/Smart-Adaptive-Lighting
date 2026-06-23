import time

def setup_gpio():
    print("🔧 Software Mode: Hardware pins bypassed.")

def trigger_alert(duration=3):
    """Simulates activating physical LED and Buzzer for emergency states."""
    print(f"🚨 [SIMULATION] ALERT TRIGGERED! Safety protocols active for {duration} seconds.")
    time.sleep(duration)
    print("🚨 [SIMULATION] ALERT ENDED!")

def cleanup_gpio():
    print("🧹 Software Mode: Cleanup complete.")