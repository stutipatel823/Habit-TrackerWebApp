# app/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.schedule_route import router as schedule_router

app = FastAPI()

origins = [os.getenv("FRONTEND_URL")]  # Your frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(schedule_router)

@app.get("/")
async def root():
    return {"message": "FastAPI is running!"}
