from fastapi import FastAPI
from app.api import test
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"] # Frontend url
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(test.testRouter)
app.include_router(test.helloRouter)

# Add a root test route
@app.get("/")
async def root():
    return {"message": "FastAPI is running!"}