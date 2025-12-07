# app/schemas/schedule_schema.py

from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class DateRange(BaseModel):
    start_ts: str
    end_ts: str

class ScheduleItem(BaseModel):
    schedule_id: Optional[str] = None
    task_id: Optional[str] = None
    title: str
    icon: str
    color: str
    start_time: str
    end_time: str
    is_habit: bool
    duration: int

class CreateScheduleItem(BaseModel):
    user_id: str
    task_id: str
    start_time: str
    end_time: str
