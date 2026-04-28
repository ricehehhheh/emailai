from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

def get_emails(access_token: str, max_results: int = 10):
    creds = Credentials(
        token=access_token,
        token_uri="https://oauth2.googleapis.com/token"
    )
    creds.expiry = None  # prevent auto-refresh attempt
    
    service = build("gmail", "v1", credentials=creds)
    
    results = service.users().messages().list(
        userId="me", maxResults=max_results
    ).execute()
    
    messages = results.get("messages", [])
    emails = []
    
    for msg in messages:
        detail = service.users().messages().get(
            userId="me", id=msg["id"], format="metadata",
            metadataHeaders=["From", "Subject", "Date"]
        ).execute()
        
        headers = {h["name"]: h["value"] for h in detail["payload"]["headers"]}
        emails.append({
            "id": msg["id"],
            "from": headers.get("From", ""),
            "subject": headers.get("Subject", ""),
            "date": headers.get("Date", ""),
            "snippet": detail.get("snippet", "")
        })
    
    return emails