from typing import Dict, Any
import json

def validate_security_event(event_data: Dict[str, Any]) -> bool:
    """Validate security event data."""
    required_fields = ['timestamp', 'type', 'details']
    return all(field in event_data for field in required_fields)

def format_security_log(event_data: Dict[str, Any]) -> str:
    """Format security event for logging."""
    return json.dumps(event_data)