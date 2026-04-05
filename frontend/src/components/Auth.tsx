import React, { useState } from 'react';
import type { User } from '../types';
import * as authService from '../services/authService';

interface AuthProps {
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
}

type AuthMode = 'login' | 'register';

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
        <h2 className="text-2xl font-semibold text-center text-white mb-1">{mode === 'login' ? 'Welcome Back' : 'Create Your Account'}</h2>
        <p className="text-center text-gray-400 mb-6">{mode === 'login' ? 'Sign in to access your links' : 'Get started for free'}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full mt-1 px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:opacity-50 text-white placeholder-gray-500"
            placeholder="you@example.com"
            />
        </div>
        <div>
            <label htmlFor="password"className="text-sm font-medium text-gray-300">Password</label>
            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
            className="w-full mt-1 px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:opacity-50 text-white placeholder-gray-500"
            placeholder="••••••••"
            />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ring-offset-gray-800 transition-all duration-200 disabled:bg-gray-500"
        >
            {isLoading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
        </button>
        </form>
        <div className="mt-6 text-center">
        <button onClick={toggleMode} className="text-sm text-primary-400 hover:underline" disabled={isLoading}>
            {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
        </div>
    </div>
  );
};
