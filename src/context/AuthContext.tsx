'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8000';

interface AuthContextType {
  token: string | null;
  loading: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing token
    const saved = localStorage.getItem('auth_token');
    if (saved) setToken(saved);
    setLoading(false);
  }, []);

  const signInWithGoogle = () => {
    window.location.href = `${API_BASE}/auth/login?app=nextjs`;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    window.location.href = '/signin';
  };

  return (
    <AuthContext.Provider value={{
      token,
      loading,
      signInWithGoogle,
      logout,
      isAuthenticated: !!token,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);