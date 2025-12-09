# app/routers/schedule_route.py
from fastapi import APIRouter
from app.schemas.schedule_schema import ExpectedScheduleCreate, ExpectedRangeRequest
from app.services.schedule_service import *

router = APIRouter(prefix="/expected", tags=["Expected Schedule"])

@router.get("/")
async def get_all_expected_schedule_items():
    return fetch_all_expected_schedule()

@router.post("/")
async def post_expected_schedule_item(body: ExpectedScheduleCreate):
    return create_expected_schedule_task(body)

@router.delete("/")
async def post_expected_schedule_item(id:str):
    return remove_expected_schedule_task(id)

@router.post("/range")
async def get_expected_range(body: ExpectedRangeRequest):
    return fetch_expected_schedule(body.start_ts, body.end_ts)

