import cv2
import time
from ultralytics import YOLO
from utils.decisionLogic import evaluate_and_alert
import os
import glob
import random

# --- TUNING PARAMETERS ---
ACCIDENT_IOU_THRESHOLD = 0.15  # 15% Overlap needed to trigger
PERSISTENCE_FRAMES = 5         # Must detect crash for 5 frames in a row (Reduces flickering)
# -------------------------

model_path = 'vision/model/artifacts/best.pt'
if not os.path.exists(model_path):
    print("⚠️ Custom model not found. Using standard YOLOv8n.")
    model_path = 'yolov8n.pt' 

model = YOLO(model_path)

# Global tracker for persistence
crash_frame_counter = 0 

def calculate_iou(box1, box2):
    """Calculates Intersection over Union (Overlap %)"""
    x1_min, y1_min, x1_max, y1_max = box1
    x2_min, y2_min, x2_max, y2_max = box2

    inter_x_min = max(x1_min, x2_min)
    inter_y_min = max(y1_min, y2_min)
    inter_x_max = min(x1_max, x2_max)
    inter_y_max = min(y1_max, y2_max)

    inter_width = max(0, inter_x_max - inter_x_min)
    inter_height = max(0, inter_y_max - inter_y_min)
    inter_area = inter_width * inter_height

    box1_area = (x1_max - x1_min) * (y1_max - y1_min)
    box2_area = (x2_max - x2_min) * (y2_max - y2_min)
    union_area = box1_area + box2_area - inter_area

    return inter_area / union_area if union_area > 0 else 0

def generate_frames():
    global crash_frame_counter
    cap = cv2.VideoCapture(0)
    
    # Fallback
    use_dataset = False
    dataset_images = []
    if not cap.isOpened():
        use_dataset = True
        dataset_images = glob.glob("datasets/**/*.jpg", recursive=True)

    while True:
        if use_dataset and dataset_images:
            img_path = random.choice(dataset_images)
            frame = cv2.imread(img_path)
            time.sleep(0.5)
        else:
            success, frame = cap.read()
            if not success: break
        
        if frame is None: continue

        # 1. Run AI
        results = model(frame, stream=True, verbose=False)
        
        vehicle_count = 0
        detected_boxes = [] 
        current_frame_crash = False

        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                class_name = model.names[cls_id]

                if conf > 0.4 and class_name in ['car', 'truck', 'bus', 'motorcycle', 'person']:
                    vehicle_count += 1
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    detected_boxes.append([x1, y1, x2, y2])
                    
                    # Draw Green Box (Safe State)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # 2. ADVANCED CRASH LOGIC
        for i in range(len(detected_boxes)):
            for j in range(i + 1, len(detected_boxes)):
                boxA = detected_boxes[i]
                boxB = detected_boxes[j]
                
                iou = calculate_iou(boxA, boxB)
                
                # VISUAL DEBUGGING: Draw line between cars and show Overlap %
                # This helps you see exactly what the AI sees
                centerA = ((boxA[0]+boxA[2])//2, (boxA[1]+boxA[3])//2)
                centerB = ((boxB[0]+boxB[2])//2, (boxB[1]+boxB[3])//2)
                
                if iou > 0.01: # If they are even slightly touching
                    # Show the Score
                    cv2.line(frame, centerA, centerB, (0, 255, 255), 1)
                    midpoint = ((centerA[0]+centerB[0])//2, (centerA[1]+centerB[1])//2)
                    cv2.putText(frame, f"{iou:.2f}", midpoint, cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)

                # Check Threshold
                if iou > ACCIDENT_IOU_THRESHOLD:
                    current_frame_crash = True
                    # Draw RED BOXES on the crashing cars
                    cv2.rectangle(frame, (boxA[0], boxA[1]), (boxA[2], boxA[3]), (0, 0, 255), 3)
                    cv2.rectangle(frame, (boxB[0], boxB[1]), (boxB[2], boxB[3]), (0, 0, 255), 3)

        # 3. PERSISTENCE CHECK (Anti-Flicker)
        if current_frame_crash:
            crash_frame_counter += 1
        else:
            crash_frame_counter = max(0, crash_frame_counter - 1) # Decay slowly

        # Trigger only if crash has persisted for X frames
        final_accident_status = False
        if crash_frame_counter >= PERSISTENCE_FRAMES:
            final_accident_status = True
            cv2.putText(frame, "!! ACCIDENT CONFIRMED !!", (50, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

        # 4. Send to Backend
        evaluate_and_alert(people_count=vehicle_count, accident_detected=final_accident_status)

        # 5. Stream
        ret, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        
    if cap: cap.release()