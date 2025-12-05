# app/routers/task_route.py
from app.schemas.task_schema import Task
from fastapi import APIRouter
from app.services.task_service import fetch_all_tasks

router = APIRouter(prefix="/tasks", tags=["Task"])

@router.get("/", response_model=list[Task])
async def get_all_tasks():
    return fetch_all_tasks()
