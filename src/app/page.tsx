'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Zap, Brain, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Landing() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
 }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Mail className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold">EmailAI</span>
          </div>
          <Link href="/welcome">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-8">
            <Zap className="size-4" />
            <span className="text-sm font-medium">AI-powered email intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent">
            Stop organizing emails.
            <br />
            Start making decisions.
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Connect all your mailboxes. Ask AI what matters. Get intelligent alerts. 
            No inbox overwhelm — just clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/welcome">
              <Button size="lg" className="text-base px-8 gap-2">
                Try it free <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              Watch demo
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            For founders, students, managers, and busy professionals
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="size-6" />}
            title="AI that understands context"
            description="Ask questions like 'What's urgent?' or 'Should I take this meeting?' — AI reads all your accounts and answers intelligently."
          />
          <FeatureCard
            icon={<Mail className="size-6" />}
            title="All mailboxes, one view"
            description="Work, personal, startup — connect unlimited accounts via IMAP. AI sees everything, so you don't have to switch."
          />
          <FeatureCard
            icon={<Zap className="size-6" />}
            title="Proactive alerts"
            description="Get reminded about meetings, unanswered critical emails, and overloaded days — without asking."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          How it works
        </h2>
        
        <div className="space-y-12">
          <Step
            number="1"
            title="Connect your email accounts"
            description="Link all your mailboxes via IMAP — work, personal, side projects. Secure and private."
          />
          <Step
            number="2"
            title="Ask AI anything"
            description="Open a chat — just like ChatGPT. Ask what's urgent, what needs a reply, or if you should attend that meeting."
          />
          <Step
            number="3"
            title="Get intelligent alerts"
            description="AI proactively reminds you about upcoming meetings, critical emails, and deadlines — no manual setup."
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for people who can't afford to miss what matters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="I was drowning in 3 inboxes. Now I just ask AI what's important and get back to building."
              author="Sarah Chen"
              role="Startup Founder"
            />
            <TestimonialCard
              quote="Game changer for managing work + school emails. I never miss deadlines anymore."
              author="Marcus Rodriguez"
              role="Graduate Student"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to take control?
          </h2>
          <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've stopped organizing and started deciding.
          </p>
          <Link href="/welcome">
            <Button size="lg" variant="secondary" className="px-8 gap-2">
              Get started for free <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="size-5 text-white" />
              </div>
              <span className="text-xl font-semibold">EmailAI</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2026 EmailAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="size-12 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="size-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-600 text-lg">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
      <div className="flex items-center gap-1 mb-4 text-violet-600">
        <CheckCircle2 className="size-5" />
        <CheckCircle2 className="size-5" />
        <CheckCircle2 className="size-5" />
        <CheckCircle2 className="size-5" />
        <CheckCircle2 className="size-5" />
      </div>
      <p className="text-slate-700 mb-4 text-lg">"{quote}"</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  );
}