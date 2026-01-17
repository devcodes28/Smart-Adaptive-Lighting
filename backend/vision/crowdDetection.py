import cv2
from utils.decisionLogic import evaluate_and_alert

def run_crowd_detection():
    # Using HOG Descriptor for human detection
    hog = cv2.HOGDescriptor()
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret: break

        frame = cv2.resize(frame, (640, 480))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect humans in frame
        boxes, weights = hog.detectMultiScale(gray, winStride=(8, 8))
        people_count = len(boxes)

        # Update decision engine with crowd data
        evaluate_and_alert(people_count, accident_detected=False)

        for (x, y, w, h) in boxes:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        cv2.imshow("Crowd Analytics", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'): break

    cap.release()
    cv2.destroyAllWindows()