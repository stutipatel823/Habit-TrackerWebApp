# app/schemas/task_schema.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Task(BaseModel):
    id: str
    user_id: str
    title: str
    icon: str
    color: str
    is_recurring: bool
    recurrence_rule: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
