import cv2
import time
from utils.decisionLogic import evaluate_and_alert
from utils.config import BIG_MOTION_THRESHOLD, INACTIVITY_TIME

def run_accident_detection():
    cap = cv2.VideoCapture(0)
    ret, prev_frame = cap.read()
    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    prev_gray = cv2.GaussianBlur(prev_gray, (21, 21), 0)

    last_big_motion_time = None
    accident_detected = False

    while True:
        ret, frame = cap.read()
        if not ret: break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # Detect Motion Intensity
        diff = cv2.absdiff(prev_gray, gray)
        thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
        motion_pixels = cv2.countNonZero(thresh)

        current_time = time.time()

        # Logic: Big motion followed by inactivity = Accident
        if motion_pixels > BIG_MOTION_THRESHOLD:
            last_big_motion_time = current_time
            accident_detected = False
        elif last_big_motion_time and (current_time - last_big_motion_time > INACTIVITY_TIME):
            accident_detected = True

        if accident_detected:
            evaluate_and_alert(people_count=0, accident_detected=True)
            cv2.putText(frame, "ACCIDENT DETECTED!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        cv2.imshow("Safety Feed", frame)
        prev_gray = gray
        if cv2.waitKey(1) & 0xFF == ord('q'): break

    cap.release()
    cv2.destroyAllWindows()