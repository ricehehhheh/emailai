from fastapi import APIRouter, Header
from services.calendar_service import get_calendar_events

router = APIRouter()

@router.get("/calendar")
def fetch_calendar(authorization: str = Header(...)):
    access_token = authorization.replace("Bearer ", "")
    events = get_calendar_events(access_token)
    return {"events": events}