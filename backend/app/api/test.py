# backend/app/api/test.py
# https://supabase.com/docs/reference/python/initializing

from fastapi import APIRouter
from app.core.supabase_client import supabase

testRouter = APIRouter(prefix="/test")
helloRouter = APIRouter(prefix="/hello")


@testRouter.get("/")
async def test_connection():
    try:
        response = supabase.table("task").select("*").execute()
        return {"status":"ok", "data": response.data}
    
    except Exception as e:
        return {"status":"error", "error":str(e)}
@helloRouter.get("/")
async def hello_message():
    return {"message":"hello world!"}