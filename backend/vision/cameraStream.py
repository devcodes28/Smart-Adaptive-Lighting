import cv2

# Initialize the camera (0 is usually the default smartphone/webcam)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Camera not detected")
    exit()

print("Camera stream active. Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # Display the stream (used for local testing/debugging)
    cv2.imshow("Camera Stream", frame)

    # Exit stream on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()