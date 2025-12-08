# app/schemas/schedule_schema.py

from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ExpectedSchedule(BaseModel):
    id: str
    user_id: str
    habit_id: Optional[str] = None
    task_id: Optional[str] = None
    start_time: datetime
    end_time: datetime

class ExpectedScheduleCreate(BaseModel):
    user_id: str
    task_id: str
    start_time: str
    end_time: str

class ExpectedRangeRequest(BaseModel):
    start_ts: str
    end_ts: str

class ExpectedScheduleWithTask(BaseModel): 
    id: str
    task_id: str
    user_id: str
    start_time: datetime
    end_time: datetime

    task_title: str
    task_icon: str
    task_color: str

# class ExpectedScheduleWithTask(BaseModel):
#     schedule: ExpectedSchedule
#     task: Task

