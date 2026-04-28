from dotenv import load_dotenv
import os
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router
from routes.emails import router as emails_router
from routes.calendar import router as calendar_router
from routes.chat import router as chat_router
from routes.reminders import router as reminders_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:52000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(emails_router)
app.include_router(calendar_router)
app.include_router(chat_router)
app.include_router(reminders_router)

@app.get("/")
def read_root():
    return {"message": "Email AI Backend is running"}