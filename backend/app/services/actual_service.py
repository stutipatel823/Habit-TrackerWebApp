# app/services/actual_service.py
from app.core.supabase_client import supabase
from datetime import datetime
from app.schemas.actual_schema import ActualSchedule, ActualScheduleCreate


def fetch_all_actual_schedule():
    try:
        response = supabase.table("actualschedule").select("*").execute()
        esItems = [ActualSchedule(**item) for item in response.data]
        return esItems
    except Exception as e:
        return {"error": str(e)}
    

def fetch_actual_schedule(start_ts: str, end_ts: str):
    response = supabase.rpc(
        "get_actual_schedule",
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

def create_actual_schedule_task(item: ActualScheduleCreate):
    response = (
        supabase.table("actualschedule")
        .insert(item.model_dump())
        .execute()
    )

    if not response.data:
        return {"error": "Insert failed"}
    
    return {"message": "Insert successful"}

def remove_actual_schedule_task(id: str):
    response = (
        supabase.table("actualschedule")
        .delete().eq("id", id)
        .execute()
    )
    if not response.data:
        return {"error": "Insert failed"}
    
    return {"message": "Delete successful"}
