import mediapipe as mp
import cv2

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(frame_rgb)

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            right_eye_distance = abs(face_landmarks.landmark[33].y - face_landmarks.landmark[133].y)
            left_eye_distance = abs(face_landmarks.landmark[263].y - face_landmarks.landmark[362].y)

            if right_eye_distance < 0.01 or left_eye_distance < 0.01:
                print("Blink Detected - Possible real person!")
            
    cv2.imshow("Blink Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
