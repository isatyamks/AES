from flask import Blueprint, jsonify, request
from ..services.exam_service import ExamService
from ..services.security_service import SecurityService
from ..services.auth_service import AuthService

api = Blueprint('api', __name__)
exam_service = ExamService()
security_service = SecurityService()
auth_service = AuthService()

@api.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    return jsonify(auth_service.login(email, password))

@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"})

@api.route('/exams/<exam_id>/start', methods=['POST'])
def start_exam(exam_id):
    return jsonify(exam_service.start_exam(exam_id))

@api.route('/exams/<exam_id>/security-log', methods=['POST'])
def log_security_event(exam_id):
    data = request.get_json()
    return jsonify(security_service.log_event(exam_id, data))