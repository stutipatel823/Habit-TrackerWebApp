# app/schemas/schedule_schema.py

from pydantic import BaseModel

class DateRange(BaseModel):
    start_ts: str
    end_ts: str