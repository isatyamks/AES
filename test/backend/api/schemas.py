from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class SecurityLog(BaseModel):
    timestamp: int
    type: str
    details: Dict[str, Any]

class ExamSubmission(BaseModel):
    exam_id: str
    student_id: str
    answers: Dict[str, int]
    security_logs: List[SecurityLog]

class Question(BaseModel):
    id: str
    text: str
    options: List[str]
    correct_answer: int