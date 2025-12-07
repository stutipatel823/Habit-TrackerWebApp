# app/services/task_service.py
from app.core.supabase_client import supabase
from app.schemas.task_schema import Task, TaskCreate

def fetch_all_tasks():
    try:
        response = supabase.table("task").select("*").execute()
        tasks = [Task(**item) for item in response.data]
        return tasks
    except Exception as e:
        return {"error": str(e)}

def create_task(item: TaskCreate):
    response = (
        supabase.table("task")
        .insert(item.model_dump())
        .execute()
    )

    if not response.data:
        return {"error": "Insert failed"}

    return Task(**response.data[0])