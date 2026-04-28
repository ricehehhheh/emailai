'use client';

import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut, User, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { logout } = useAuth();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="size-5 text-slate-400" />
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3 mb-4">
            <User className="size-5 text-violet-600" />
            <h2 className="font-semibold text-slate-800">Account</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">You are signed in via Google OAuth. Your Gmail and Calendar are connected.</p>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-lg w-fit">
            <div className="size-2 bg-green-500 rounded-full" />
            Gmail & Calendar connected
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="size-5 text-violet-600" />
            <h2 className="font-semibold text-slate-800">Privacy</h2>
          </div>
          <p className="text-sm text-slate-500">EmailAI only reads your emails and calendar to answer your questions. No data is stored permanently.</p>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-slate-800 mb-3">Sign Out</h2>
          <p className="text-sm text-slate-500 mb-4">This will clear your session and return you to the sign-in page.</p>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
