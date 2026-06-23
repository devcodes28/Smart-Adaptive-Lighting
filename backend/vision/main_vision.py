import cv2
import time
from utils.decisionLogic import evaluate_and_alert
from utils.config import BIG_MOTION_THRESHOLD, INACTIVITY_TIME

def run_vision_system():
    print("👁️ Starting AI Vision System...")
    cap = cv2.VideoCapture(0) # 0 is your default webcam
    
    if not cap.isOpened():
        print("❌ Error: Could not open camera.")
        return

    # Initialize human detector
    hog = cv2.HOGDescriptor()
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

    ret, prev_frame = cap.read()
    if not ret: return
    
    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    prev_gray = cv2.GaussianBlur(prev_gray, (21, 21), 0)

    last_big_motion_time = None

    while True:
        ret, frame = cap.read()
        if not ret: break

        frame = cv2.resize(frame, (640, 480))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur_gray = cv2.GaussianBlur(gray, (21, 21), 0)

        # 1. Detect Pedestrians
        boxes, _ = hog.detectMultiScale(gray, winStride=(8, 8))
        people_count = len(boxes)

        # 2. Detect Sudden Motion/Accidents
        diff = cv2.absdiff(prev_gray, blur_gray)
        thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
        motion_pixels = cv2.countNonZero(thresh)

        current_time = time.time()
        accident_detected = False

        if motion_pixels > BIG_MOTION_THRESHOLD:
            last_big_motion_time = current_time
        elif last_big_motion_time and (current_time - last_big_motion_time > INACTIVITY_TIME):
            accident_detected = True

        # 3. Update the global state dictionary continuously
        evaluate_and_alert(people_count, accident_detected)

        prev_gray = blur_gray
        time.sleep(0.1) # Small delay to prevent maxing out CPU
        
    cap.release()