'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Settings, Menu, X } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);

  const navItems = [
    { path: '/dashboard', icon: Mail, label: 'Dashboard' },
    { path: '/dashboard/inbox', icon: Mail, label: 'Inbox' },
    { path: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 bg-white border-r flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Mail className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold">EmailAI</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${active ? 'bg-violet-50 text-violet-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                    <Icon className={`size-5 ${active ? 'text-violet-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <X className="size-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden border-b bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Mail className="size-5 text-white" />
          </div>
          <span className="text-lg font-semibold">EmailAI</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <button onClick={() => setMobileMenuOpen(false)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${active ? 'bg-violet-50 text-violet-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                    <Icon className={`size-5 ${active ? 'text-violet-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium">
              <X className="size-5" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1 overflow-auto">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
