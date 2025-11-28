# app/routers/schedule_route.py
from fastapi import APIRouter
from app.schemas.schedule_schema import DateRange
from app.services.schedule_service import fetch_expected_schedule

router = APIRouter(prefix="/expected", tags=["Expected Schedule"])

@router.post("/range")
async def get_expected_range(body: DateRange):
    return fetch_expected_schedule(body.start_ts, body.end_ts)

