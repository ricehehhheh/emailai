from fastapi import APIRouter, Header, HTTPException
from services.gmail_service import get_emails
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
        return raw  # fallback: treat as raw token

@router.get("/emails")
def fetch_emails(authorization: str = Header(...)):
    access_token = extract_access_token(authorization)
    try:
        emails = get_emails(access_token)
        return {"emails": emails}
    except Exception as e:
        error_str = str(e).lower()
        if "401" in error_str or "invalid_grant" in error_str or "refresherror" in error_str or "invalid credentials" in error_str:
            raise HTTPException(status_code=401, detail="Token expired.")
        raise HTTPException(status_code=500, detail=str(e))