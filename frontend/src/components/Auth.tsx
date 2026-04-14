import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import type { User } from '../types';
import * as authService from '../services/authService';

interface AuthProps {
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  initialMode?: 'login' | 'register';
  initialEmail?: string;
}

type AuthMode = 'login' | 'register';

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, initialMode = 'login', initialEmail = '' }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (mode === 'login') {
        const user = await authService.login(email, password);
        onLogin(user);
      } else {
        const user = await authService.register(email, password);
        onRegister(user);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setError(null);
      setIsLoading(true);
      try {
        const user = await authService.googleLogin(access_token);
        onLogin(user);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Google sign-in failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError('Google sign-in failed'),
  });

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2 className="text-2xl font-headline font-bold text-center text-zinc-900 mb-1">
        {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
      </h2>
      <p className="text-center text-zinc-500 mb-6 font-body">
        {mode === 'login' ? 'Sign in to access your links' : 'Get started for free'}
      </p>

      {/* Google Sign-In */}
      <button
        type="button"
        onClick={() => googleLogin()}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-zinc-700 font-medium rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors disabled:opacity-50 mb-4 font-body shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-4">
        <hr className="flex-1 border-zinc-200" />
        <span className="text-zinc-400 text-sm font-body">or</span>
        <hr className="flex-1 border-zinc-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 font-body">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full mt-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4AC5]/20 focus:border-[#5D4AC5] disabled:opacity-50 text-zinc-900 placeholder-zinc-400 font-body"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 font-body">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
            className="w-full mt-1 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4AC5]/20 focus:border-[#5D4AC5] disabled:opacity-50 text-zinc-900 placeholder-zinc-400 font-body"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center font-body">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-[#5D4AC5] text-white font-headline font-bold rounded-full shadow-lg shadow-[#5D4AC5]/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>

      <div className="mt-5 text-center">
        <button onClick={toggleMode} className="text-sm text-[#5D4AC5] hover:underline font-body" disabled={isLoading}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};
