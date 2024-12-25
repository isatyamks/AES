from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Exam(Base):
    __tablename__ = 'exams'
    
    id = Column(String, primary_key=True)
    student_id = Column(String, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime)
    status = Column(String, nullable=False)
    answers = Column(JSON)

class SecurityEvent(Base):
    __tablename__ = 'security_events'
    
    id = Column(Integer, primary_key=True)
    exam_id = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    event_type = Column(String, nullable=False)
    details = Column(JSON)