# app/services/schedule_service.py
from app.core.supabase_client import supabase
from datetime import datetime

def fetch_expected_schedule(start_ts: str, end_ts: str):
    response = supabase.rpc(
        "get_expected_schedule",
        {
            "start_ts": start_ts,
            "end_ts": end_ts
        }
    ).execute()

    items = response.data or []
    schedule_with_duration = []
    for item in items:
        start = datetime.fromisoformat(item["start_time"])
        end = datetime.fromisoformat(item["end_time"])

        duration_minutes = int((end - start).total_seconds() / 60)
        schedule_with_duration.append({
            **item, 
            "duration": duration_minutes
        })
    return schedule_with_duration
