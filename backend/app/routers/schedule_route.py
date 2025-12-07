# app/routers/schedule_route.py
from fastapi import APIRouter
from app.schemas.schedule_schema import DateRange, CreateScheduleItem
from app.services.schedule_service import fetch_expected_schedule, create_expected_schedule_task

router = APIRouter(prefix="/expected", tags=["Expected Schedule"])

@router.post("/range")
async def get_expected_range(body: DateRange):
    return fetch_expected_schedule(body.start_ts, body.end_ts)

@router.post("/")
async def post_expected_schedule_item(body: CreateScheduleItem):
    return create_expected_schedule_task(body)