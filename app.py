from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from src.scan_face import scan_face





app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'data/faces'




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload')
def upload_page():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'status': 'failure', 'message': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'failure', 'message': 'No file selected'})
    
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return jsonify({'status': 'success', 'message': f'File {file.filename} uploaded successfully'})
    return jsonify({'status': 'failure', 'message': 'Failed to upload file'})




@app.route('/scan', methods=['POST'])
def scan_faces():
    return scan_face()


@app.route('/attendance')
def attendance():
    with open('a.csv', 'r') as f:
        data = f.readlines()
    attendance_list = [line.strip().split(',') for line in data]
    return jsonify({'attendance': attendance_list})

if __name__ == '__main__':
    app.run(debug=True)
