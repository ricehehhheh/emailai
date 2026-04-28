from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import datetime, timezone
import os

def get_calendar_events(access_token: str):
    creds = Credentials(
        token=access_token,
        refresh_token=None,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        scopes=["https://www.googleapis.com/auth/calendar.readonly"]
    )

    service = build("calendar", "v3", credentials=creds)

    events_result = service.events().list(
        calendarId="primary",
        maxResults=10,
        singleEvents=True,
        orderBy="startTime",
        timeMin=datetime.now(timezone.utc).isoformat()
    ).execute()

    events = events_result.get("items", [])

    return [
        {
            "id": e.get("id"),
            "summary": e.get("summary", "No title"),
            "start": e.get("start", {}).get("dateTime") or e.get("start", {}).get("date"),
            "end": e.get("end", {}).get("dateTime") or e.get("end", {}).get("date"),
            "location": e.get("location", ""),
            "description": e.get("description", ""),
        }
        for e in events
    ]