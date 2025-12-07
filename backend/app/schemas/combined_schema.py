# app/schemas/combined_schema.py
from pydantic import BaseModel
from typing import Optional

class TaskWithScheduleCreate(BaseModel):
    user_id: str
    title: str
    icon: str
    color: str
    is_recurring: bool = False
    recurrence_rule: Optional[str] = None

    start_time: str
    end_time: str
