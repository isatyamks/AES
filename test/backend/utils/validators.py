from typing import Dict, Any, List

def validate_exam_submission(submission: Dict[str, Any]) -> List[str]:
    """Validate exam submission data."""
    errors = []
    required_fields = ['exam_id', 'student_id', 'answers']
    
    for field in required_fields:
        if field not in submission:
            errors.append(f"Missing required field: {field}")
            
    return errors