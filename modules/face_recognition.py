import cv2
from modules.encoding import find_encodings
from modules.attendance import mark_attendance
import face_recognition
import numpy as np
import os

path = 'data/faces'
images = []
class_names = [os.path.splitext(cl)[0] for cl in os.listdir(path)]
for cl in os.listdir(path):
    cur_img = cv2.imread(f'{path}/{cl}')
    images.append(cur_img)

encode_list_known = find_encodings(images)
print("Encoding Complete")

def process_frame():
    cap = cv2.VideoCapture(0)
    while True:
        success, img = cap.read()
        if not success:
            break
        img_s = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        img_s = cv2.cvtColor(img_s, cv2.COLOR_BGR2RGB)

        faces_cur_frame = face_recognition.face_locations(img_s)
        encodes_cur_frame = face_recognition.face_encodings(img_s, faces_cur_frame)

        for encode_face, face_loc in zip(encodes_cur_frame, faces_cur_frame):
            matches = face_recognition.compare_faces(encode_list_known, encode_face)
            face_dis = face_recognition.face_distance(encode_list_known, encode_face)
            match_index = np.argmin(face_dis)

            if matches[match_index]:
                name = class_names[match_index].upper()
                y1, x2, y2, x1 = face_loc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                mark_attendance(name)

        frame = cv2.imencode('.jpg', img)[1].tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()
