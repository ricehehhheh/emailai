'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Chrome, Github, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle email/password sign in
    console.log('Email/Password sign in:', { email, password, name });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/connect-mailbox');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="size-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Mail className="size-7 text-white" />
          </div>
          <span className="text-2xl font-bold">EmailAI</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-slate-600">
              {isSignUp 
                ? 'Start managing all your emails with AI' 
                : 'Sign in to continue to EmailAI'}
            </p>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              size="lg"
              onClick={handleGoogleSignIn}
            >
              <Chrome className="size-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full gap-2" size="lg">
              <Github className="size-5" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-slate-500">
              or
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <button
                    type="button"
                    className="text-sm text-violet-600 hover:text-violet-700"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="size-4" />
            </Button>
          </form>

          {/* Toggle Sign In/Up */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <span className="text-violet-600 font-medium">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span className="text-violet-600 font-medium">Sign up</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="/welcome" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back
          </Link>
        </div>

        <p className="text-xs text-slate-500 text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}