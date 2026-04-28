from fastapi import APIRouter, Header, HTTPException
from services.gmail_service import get_emails
from services.calendar_service import get_calendar_events
from services.ai_service import get_reminders
import jwt
import os

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY", "email-ai-secret-key-2024")


def extract_access_token(authorization: str) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    app_jwt = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(app_jwt, SECRET_KEY, algorithms=["HS256"])
        return payload.get("access_token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/reminders")
async def reminders_endpoint(authorization: str = Header(None)):
    access_token = extract_access_token(authorization)
    try:
        emails = get_emails(access_token)
        calendar = get_calendar_events(access_token)
        items = get_reminders(emails, calendar)
        return {"reminders": items}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))