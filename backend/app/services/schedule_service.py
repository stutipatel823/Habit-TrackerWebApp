# app/services/schedule_service.py
from app.core.supabase_client import supabase

def fetch_expected_schedule(start_ts: str, end_ts: str):
    response = supabase.rpc(
        "get_expected_schedule",
        {
            "start_ts": start_ts,
            "end_ts": end_ts
        }
    ).execute()

    return response.data
