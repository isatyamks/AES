import face_recognition
import cv2

# Load a known image (candidate photo)
known_image = face_recognition.load_image_file("data\\3.jpg")
known_face_encoding = face_recognition.face_encodings(known_image)[0]

# Initialize webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Find all face locations and encodings
    rgb_frame = frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    # Compare faces
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces([known_face_encoding], face_encoding)
        if True in matches:
            print("Exam candidate detected")
        else:
            print("Not the exam candidate")
    
    cv2.imshow("Face Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
