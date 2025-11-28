# app/schemas/schedule_schema.py

from pydantic import BaseModel

class DateRange(BaseModel):
    start_ts: str
    end_ts: str

class ScheduleItem(BaseModel):
    schedule_id: str
    title: str
    icon: str
    color: str
    start_time: str
    end_time: str
    is_habit: bool
    duration: int

