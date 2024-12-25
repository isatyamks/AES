from sqlalchemy.orm import Session
from .models import Exam, SecurityEvent
from datetime import datetime

class ExamRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def create_exam(self, exam_id: str, student_id: str) -> Exam:
        exam = Exam(
            id=exam_id,
            student_id=student_id,
            start_time=datetime.utcnow(),
            status='active'
        )
        self.session.add(exam)
        self.session.commit()
        return exam

class SecurityRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def log_event(self, exam_id: str, event_type: str, details: dict) -> SecurityEvent:
        event = SecurityEvent(
            exam_id=exam_id,
            timestamp=datetime.utcnow(),
            event_type=event_type,
            details=details
        )
        self.session.add(event)
        self.session.commit()
        return event