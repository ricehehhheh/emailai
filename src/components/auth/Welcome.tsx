'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600" />
          <span className="font-semibold text-xl">ChiefAI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signin">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100 border-none">
              ✨ Your AI Chief of Staff
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Manage all your inboxes
              </span>
              <br />
              with one intelligent assistant
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              Connect work, personal, and startup email accounts. Let AI prioritize, 
              draft replies, and protect your time — all through a simple chat interface.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link href="/signin">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Right Content - Preview Card */}
          <div className="flex-1">
            <Card className="p-6 shadow-2xl border-0 bg-white/80 backdrop-blur">
              <div className="space-y-4">
                {/* Chat Preview */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex-shrink-0" />
                  <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <p className="text-gray-800">You have 3 urgent emails from investors. Want me to draft replies?</p>
                    <span className="text-xs text-gray-500 mt-2 block">Just now</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 bg-violet-600 text-white rounded-2xl rounded-tr-none p-4">
                    <p>Yes, draft replies and suggest meeting times for tomorrow</p>
                    <span className="text-xs text-violet-200 mt-2 block">1 min ago</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                </div>

                {/* Priority Email Preview */}
                <div className="mt-6 p-4 border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="font-medium">Urgent: Investor Meeting</span>
                    </div>
                    <Badge className="bg-red-100 text-red-700">Critical</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Sarah Chen • 2 hours ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to master your inbox
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Priority Scoring</h3>
              <p className="text-gray-600">
                Automatically identifies what needs your attention vs what can wait
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Meeting Detection</h3>
              <p className="text-gray-600">
                Detects meeting requests and checks calendar conflicts automatically
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Reminders</h3>
              <p className="text-gray-600">
                Alerts you about unanswered critical emails and packed schedules
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}