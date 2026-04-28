'use client';

import { useEffect, useState } from 'react';
import { fetchEmails } from '@/lib/api';
import { Mail, RefreshCw, AlertCircle, Search } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
}

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Email | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchEmails();
      setEmails(data.emails || []);
    } catch (e) {
      setError('Failed to load emails. Your session may have expired.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = emails.filter(e =>
    e.from.toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase()) ||
    e.snippet.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="size-5 text-slate-400" />
          <h1 className="font-semibold text-slate-800">Inbox</h1>
          {!loading && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{emails.length} emails</span>}
        </div>
        <button onClick={loadEmails} className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-50 border rounded-lg hover:bg-slate-100 transition-colors">
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-2 bg-slate-50 border rounded-lg px-3 py-2">
          <Search className="size-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <AlertCircle className="size-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Email list + detail view */}
      <div className="flex-1 overflow-hidden flex">
        {/* List */}
        <div className={`${selected ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-80 xl:w-96 border-r overflow-y-auto bg-white`}>
          {loading ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="size-6 animate-spin mx-auto mb-2" />
              Loading emails...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No emails found.</div>
          ) : (
            filtered.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelected(email)}
                className={`px-5 py-4 border-b cursor-pointer hover:bg-violet-50 transition-colors ${selected?.id === email.id ? 'bg-violet-50 border-l-2 border-l-violet-600' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-slate-800 text-sm truncate">{email.from}</span>
                  <span className="text-xs text-slate-400 flex-shrink-0">{email.date}</span>
                </div>
                <div className="text-sm text-slate-700 truncate font-medium">{email.subject}</div>
                <div className="text-xs text-slate-400 truncate mt-0.5">{email.snippet}</div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            <button onClick={() => setSelected(null)} className="lg:hidden text-sm text-violet-600 mb-4">← Back</button>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{selected.subject}</h2>
              <div className="text-sm text-slate-500">From: <span className="text-slate-700">{selected.from}</span></div>
              <div className="text-sm text-slate-500">Date: <span className="text-slate-700">{selected.date}</span></div>
            </div>
            <div className="border-t pt-4 text-sm text-slate-700 leading-relaxed">
              {selected.snippet}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center text-slate-400">
            <div className="text-center">
              <Mail className="size-12 mx-auto mb-3 opacity-30" />
              <p>Select an email to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
