import cv2
import time
from ultralytics import YOLO
from utils.decisionLogic import evaluate_and_alert

# 1. Load your new custom model
# This path points to the file you just moved into 'artifacts'
model = YOLO('vision/model/artifacts/best.pt') 

def run_accident_detection():
    # Initialize Camera
    cap = cv2.VideoCapture(0)
    
    # Settings
    CONF_THRESHOLD = 0.5  # Only detect if 50% sure
    
    print("✅ Smart Lighting Vision System Started...")
    print("   (Press 'q' to stop)")

    while True:
        ret, frame = cap.read()
        if not ret: 
            print("❌ Camera error")
            break

        # 2. Let the AI look at the frame
        results = model(frame, stream=True, verbose=False)

        traffic_detected = False
        vehicle_count = 0
        
        # 3. Analyze what the AI saw
        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                class_name = model.names[cls_id]

                # 4. Check for Vehicles (Car, Truck, Bus, Motorcycle)
                # Note: The standard YOLO model uses these names.
                if conf > CONF_THRESHOLD and class_name in ['car', 'truck', 'bus', 'motorcycle']:
                    vehicle_count += 1
                    traffic_detected = True
                    
                    # Draw a Green Box around the vehicle
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, f"{class_name.upper()} {conf:.2f}", (x1, y1 - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # 5. Decision Logic (Traffic = Lights ON)
        if traffic_detected:
            # We treat cars like "people" for the logic -> Brightness 100%
            evaluate_and_alert(people_count=vehicle_count, accident_detected=False)
        else:
            # No cars -> Brightness Dim/Off
            evaluate_and_alert(people_count=0, accident_detected=False)

        # Show the video feed
        cv2.imshow("Smart Adaptive Lighting - Traffic View", frame)
        
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'): 
            break

    cap.release()
    cv2.destroyAllWindows()