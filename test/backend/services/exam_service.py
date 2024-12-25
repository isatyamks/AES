from ..database.repository import ExamRepository
from typing import Dict, Any

class ExamService:
    def __init__(self):
        # Repository will be injected when database is set up
        pass
        
    def start_exam(self, exam_id: str) -> Dict[str, Any]:
        # Mock exam data for testing
        return {
            "examId": exam_id,
            "duration": 1800,  # 30 minutes in seconds
            "questions": [
                {
                    "id": "1",
                    "text": "What is the capital of France?",
                    "options": ["London", "Berlin", "Paris", "Madrid"],
                    "correctAnswer": 2
                },
                {
                    "id": "2",
                    "text": "Which planet is known as the Red Planet?",
                    "options": ["Venus", "Mars", "Jupiter", "Saturn"],
                    "correctAnswer": 1
                }
            ]
        }