'use client';

import { Button } from '@/components/ui/button';
import { Mail, Sparkles, Brain, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="size-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Mail className="size-9 text-white" />
          </div>
          <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            EmailAI
          </span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6">
            <Sparkles className="size-4" />
            <span className="text-sm font-medium">AI-Powered Email Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the future of email
          </h1>

          <p className="text-lg text-slate-600 mb-12 max-w-xl mx-auto">
            Stop drowning in multiple inboxes. Let AI read, understand, and tell you what actually matters.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={<Brain className="size-6" />}
              title="AI Decisions"
              description="Ask what's urgent, get intelligent answers"
            />
            <FeatureCard
              icon={<Mail className="size-6" />}
              title="All Accounts"
              description="Work, personal, startup — all in one place"
            />
            <FeatureCard
              icon={<Zap className="size-6" />}
              title="Smart Alerts"
              description="Never miss what matters with proactive reminders"
            />
          </div>

          {/* CTA */}
          <Link href="/signin">
            <Button size="lg" className="px-8 gap-2 text-base">
              Get Started <ArrowRight className="size-4" />
            </Button>
          </Link>

          <p className="text-sm text-slate-500 mt-6">
            Free for 14 days • No credit card required
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="size-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-3">
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}