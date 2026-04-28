from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from services.ai_service import analyze_emails, chat_with_ai
from services.gmail_service import get_emails
from services.calendar_service import get_calendar_events
import jwt
import os

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY", "email-ai-secret-key-2024")

def extract_access_token(authorization: str) -> str:
    raw = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(raw, SECRET_KEY, algorithms=["HS256"])
        return payload.get("access_token", raw)
    except Exception:
        return raw

class ChatRequest(BaseModel):
    message: str

@router.get("/analyze")
def analyze(authorization: str = Header(...)):
    try:
        access_token = extract_access_token(authorization)
        emails = get_emails(access_token)
        analysis = analyze_emails(emails)
        return {"analysis": analysis}
    except Exception as e:
        error_str = str(e).lower()
        if "401" in error_str or "invalid credentials" in error_str:
            raise HTTPException(status_code=401, detail="Token expired.")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
def chat(req: ChatRequest, authorization: str = Header(...)):
    try:
        access_token = extract_access_token(authorization)
        emails = get_emails(access_token)
        calendar = get_calendar_events(access_token)
        reply = chat_with_ai(req.message, emails, calendar)
        return {"reply": reply}
    except Exception as e:
        error_str = str(e).lower()
        if "401" in error_str or "invalid credentials" in error_str:
            raise HTTPException(status_code=401, detail="Token expired.")
        raise HTTPException(status_code=500, detail=str(e))