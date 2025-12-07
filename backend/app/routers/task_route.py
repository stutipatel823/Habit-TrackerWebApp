# app/routers/task_route.py
from app.schemas.task_schema import Task, TaskCreate
from fastapi import APIRouter
from app.services.task_service import fetch_all_tasks, create_task

router = APIRouter(prefix="/tasks", tags=["Task"])

@router.get("/", response_model=list[Task])
async def get_all_tasks():
    return fetch_all_tasks()


@router.post("/", response_model=Task)
async def post_task(body: TaskCreate):
    return create_task(body)


