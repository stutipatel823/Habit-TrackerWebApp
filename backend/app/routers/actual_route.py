# app/routers/actual_route.py
from fastapi import APIRouter
from app.schemas.actual_schema import ActualScheduleCreate, ActualScheduleRangeRequest
from app.services.actual_service import *

router = APIRouter(prefix="/schedule/actual", tags=["Schedule"])

@router.get("/")
async def get_all_actual_schedule_items():
    return fetch_all_actual_schedule()

@router.post("/")
async def post_actual_schedule_item(body: ActualScheduleCreate):
    return create_actual_schedule_task(body)

@router.delete("/")
async def post_actual_schedule_item(id:str):
    return remove_actual_schedule_task(id)

@router.post("/range")
async def get_actual_range(body: ActualScheduleRangeRequest):
    return fetch_actual_schedule(body.start_ts, body.end_ts)