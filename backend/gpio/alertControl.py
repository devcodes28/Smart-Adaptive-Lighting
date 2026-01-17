import time

try:
    import RPi.GPIO as GPIO
    IS_PI = True
except ImportError:
    IS_PI = False

# Pin Definitions
LED_PIN = 18
BUZZER_PIN = 23

def setup_gpio():
    if IS_PI:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(LED_PIN, GPIO.OUT)
        GPIO.setup(BUZZER_PIN, GPIO.OUT)
        GPIO.output(LED_PIN, GPIO.LOW)
        GPIO.output(BUZZER_PIN, GPIO.LOW)

def trigger_alert(duration=3):
    """Activates physical LED and Buzzer for emergency states."""
    if IS_PI:
        GPIO.output(LED_PIN, GPIO.HIGH)
        GPIO.output(BUZZER_PIN, GPIO.HIGH)
        time.sleep(duration)
        GPIO.output(LED_PIN, GPIO.LOW)
        GPIO.output(BUZZER_PIN, GPIO.LOW)
    else:
        print("🚨 ALERT TRIGGERED (Hardware Simulated)")

def cleanup_gpio():
    if IS_PI:
        GPIO.cleanup()