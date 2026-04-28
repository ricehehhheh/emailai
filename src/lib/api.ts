const API_BASE = 'http://localhost:8000';

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

function headers() {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchEmails() {
  const res = await fetch(`${API_BASE}/emails`, { headers: headers() });
  if (!res.ok) throw new ApiError('Failed to fetch emails', res.status);
  return res.json();
}

export async function fetchCalendar() {
  const res = await fetch(`${API_BASE}/calendar`, { headers: headers() });
  if (!res.ok) throw new ApiError('Failed to fetch calendar', res.status);
  return res.json();
}

export async function analyzeEmails() {
  const res = await fetch(`${API_BASE}/analyze`, { headers: headers() });
  if (!res.ok) throw new ApiError('Failed to analyze emails', res.status);
  return res.json();
}

export async function chatWithAI(message: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new ApiError('Failed to send message', res.status);
  return res.json();
}

export async function fetchReminders() {
  const res = await fetch(`${API_BASE}/reminders`, { headers: headers() });
  if (!res.ok) throw new ApiError('Failed to fetch reminders', res.status);
  return res.json();
}