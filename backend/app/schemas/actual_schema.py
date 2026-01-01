# app/schemas/actual_schema.py

from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ActualSchedule(BaseModel):
    id: str
    user_id: str
    habit_id: Optional[str] = None
    task_id: Optional[str] = None
    start_time: datetime
    end_time: datetime

class ActualScheduleCreate(BaseModel):
    user_id: str
    task_id: str
    start_time: str
    end_time: str

class ActualScheduleRangeRequest(BaseModel):
    start_ts: str
    end_ts: str

class ActualScheduleWithTask(BaseModel): 
    id: str
    task_id: str
    user_id: str
    start_time: datetime
    end_time: datetime

    task_title: str
    task_icon: str
    task_color: str

class ActualScheduleWithTask(BaseModel): 
    id: str
    task_id: str
    user_id: str
    start_time: datetime
    end_time: datetime

    task_title: str
    task_icon: str
    task_color: str
