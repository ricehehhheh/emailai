from fastapi import APIRouter, Query
from fastapi.responses import RedirectResponse
import requests
import os
import jwt
import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_CLIENT_ID     = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI  = os.getenv("GOOGLE_REDIRECT_URI")
SECRET_KEY           = os.getenv("SECRET_KEY", "email-ai-secret-key-2024")

SCOPES = " ".join([
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
    "openid", "email", "profile"
])

ALLOWED_FRONTENDS = {
    "flutter": "emailai://auth-callback",
    "nextjs":  "http://localhost:3001/auth/callback",
}
DEFAULT_FRONTEND = "flutter"


@router.get("/auth/login")
def login(app: str = Query(default=DEFAULT_FRONTEND)):
    if app not in ALLOWED_FRONTENDS:
        app = DEFAULT_FRONTEND

    params = {
        "client_id":     GOOGLE_CLIENT_ID,
        "redirect_uri":  GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope":         SCOPES,
        "access_type":   "offline",
        "prompt":        "consent",
        "state":         app,
    }

    query = "&".join(f"{k}={requests.utils.quote(str(v))}" for k, v in params.items())
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{query}"
    return RedirectResponse(auth_url)


@router.get("/auth/callback")
def callback(code: str, state: str = DEFAULT_FRONTEND):
    token_response = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code":          code,
            "client_id":     GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri":  GOOGLE_REDIRECT_URI,
            "grant_type":    "authorization_code",
        }
    )

    token_data = token_response.json()
    access_token  = token_data.get("access_token")
    refresh_token = token_data.get("refresh_token")

    if not access_token:
        error = token_data.get("error", "unknown_error")
        return RedirectResponse(f"http://localhost:3001/signin?error={error}")

    # Store both tokens in a signed JWT — no expiry so user stays logged in
    app_jwt = jwt.encode(
        {
            "access_token":  access_token,
            "refresh_token": refresh_token,
            "issued_at":     datetime.datetime.utcnow().isoformat(),
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    frontend = ALLOWED_FRONTENDS.get(state, ALLOWED_FRONTENDS[DEFAULT_FRONTEND])
    return RedirectResponse(f"{frontend}?token={app_jwt}")


@router.post("/auth/refresh")
def refresh_token_endpoint(body: dict):
    """Called by frontend when access token expires — returns new access token."""
    app_jwt = body.get("token")
    if not app_jwt:
        return {"error": "No token provided"}

    try:
        payload = jwt.decode(app_jwt, SECRET_KEY, algorithms=["HS256"])
        refresh_token = payload.get("refresh_token")

        if not refresh_token:
            return {"error": "No refresh token available"}

        # Get new access token from Google
        res = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id":     GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "refresh_token": refresh_token,
                "grant_type":    "refresh_token",
            }
        )

        new_data = res.json()
        new_access_token = new_data.get("access_token")

        if not new_access_token:
            return {"error": "Failed to refresh", "detail": new_data}

        # Re-encode JWT with new access token, keep same refresh token
        new_jwt = jwt.encode(
            {
                "access_token":  new_access_token,
                "refresh_token": refresh_token,
                "issued_at":     datetime.datetime.utcnow().isoformat(),
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        return {"token": new_jwt}

    except Exception as e:
        return {"error": str(e)}