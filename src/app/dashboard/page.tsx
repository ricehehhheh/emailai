'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchEmails, analyzeEmails, fetchReminders } from '@/lib/api';
import {
  Mail, Sparkles, RefreshCw, AlertCircle,
  Calendar, Cake, Clock, Bell
} from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
}

interface Reminder {
  type: 'meeting' | 'birthday' | 'deadline' | 'reminder';
  title: string;
  time: string;
}

const REMINDER_CONFIG = {
  meeting: {
    icon: <Calendar className="size-4" />,
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    emoji: '🗓',
  },
  birthday: {
    icon: <Cake className="size-4" />,
    bg: 'bg-pink-50',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-700',
    emoji: '🎂',
  },
  deadline: {
    icon: <Clock className="size-4" />,
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    emoji: '⚠️',
  },
  reminder: {
    icon: <Bell className="size-4" />,
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    emoji: '🔔',
  },
};

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [emails, setEmails] = useState<Email[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      loadEmails();
      loadReminders();
    }
  }, [token]);

  const loadEmails = async () => {
    try {
      setLoadingEmails(true);
      setError('');
      const data = await fetchEmails();
      setEmails(data.emails || []);
    } catch (e: any) {
      if (e?.status === 401 || e?.message?.includes('401')) {
        logout();
        router.push('/signin?reason=expired');
        return;
      }
      setError('Failed to load emails. Your session may have expired.');
    } finally {
      setLoadingEmails(false);
    }
  };

  const loadReminders = async () => {
    try {
      setLoadingReminders(true);
      const data = await fetchReminders();
      setReminders(data.reminders || []);
    } catch (e: any) {
      if (e?.status === 401 || e?.message?.includes('401')) {
        logout();
        router.push('/signin?reason=expired');
        return;
      }
      setReminders([]);
    } finally {
      setLoadingReminders(false);
    }
  };

  const runAnalysis = async () => {
    try {
      setLoadingAnalysis(true);
      setAnalysis('');
      const data = await analyzeEmails();
      setAnalysis(data.analysis);
    } catch (e: any) {
      if (e?.status === 401 || e?.message?.includes('401')) {
        logout();
        router.push('/signin?reason=expired');
        return;
      }
      setAnalysis('AI analysis failed. Please try again later.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleRefresh = () => {
    loadEmails();
    loadReminders();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Your inbox at a glance</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 bg-white border rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <AlertCircle className="size-5 flex-shrink-0" />
          <span>{error}</span>
          <button
            onClick={() => router.push('/signin')}
            className="ml-auto text-sm underline font-medium"
          >
            Sign in again
          </button>
        </div>
      )}

      {/* AI Analysis Panel */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-violet-600" />
            <h2 className="font-semibold text-slate-800">AI Inbox Analysis</h2>
          </div>
          <button
            onClick={runAnalysis}
            disabled={loadingAnalysis || loadingEmails}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loadingAnalysis ? (
              <><RefreshCw className="size-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="size-4" /> Analyze Inbox</>
            )}
          </button>
        </div>
        {analysis ? (
          <div className="text-sm text-slate-700 whitespace-pre-wrap bg-white rounded-lg p-4 border border-violet-100">
            {analysis}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Click "Analyze Inbox" to get an AI summary of your emails — action items, urgent messages, and highlights.
          </p>
        )}
      </div>

      {/* Reminders Box */}
      <div className="bg-white rounded-xl border mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-amber-500" />
            <h2 className="font-semibold text-slate-800">Reminders</h2>
            {reminders.length > 0 && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                {reminders.length}
              </span>
            )}
          </div>
          <button
            onClick={loadReminders}
            disabled={loadingReminders}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className={`size-3 ${loadingReminders ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loadingReminders ? (
          <div className="p-8 text-center text-slate-400">
            <RefreshCw className="size-6 animate-spin mx-auto mb-2" />
            <p className="text-sm">AI is scanning your emails and calendar...</p>
          </div>
        ) : reminders.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-slate-500 text-sm">No reminders right now. You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y">
            {reminders.map((reminder, index) => {
              const config = REMINDER_CONFIG[reminder.type] ?? REMINDER_CONFIG.reminder;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 px-5 py-4 ${config.bg}`}
                >
                  <div className={`size-8 rounded-lg ${config.iconBg} ${config.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-800">
                        {config.emoji} {reminder.title}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.badge}`}>
                        {reminder.type}
                      </span>
                    </div>
                    {reminder.time && (
                      <p className="text-xs text-slate-500 mt-0.5">{reminder.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center">
          <div className="text-2xl font-bold text-slate-800">
            {loadingEmails ? '...' : emails.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
            <Mail className="size-3" /> Total emails
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {loadingReminders ? '...' : reminders.filter(r => r.type === 'deadline').length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
            <Clock className="size-3" /> Deadlines
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {loadingReminders ? '...' : reminders.filter(r => r.type === 'meeting').length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
            <Calendar className="size-3" /> Meetings
          </div>
        </div>
      </div>

    </div>
  );
}