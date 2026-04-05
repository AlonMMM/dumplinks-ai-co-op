import type { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const TOKEN_KEY = 'dumplinks_jwt';

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};

const storeToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const register = async (email: string, password: string): Promise<User> => {
  const { token, user } = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  storeToken(token);
  return user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { token, user } = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  storeToken(token);
  return user;
};

export const googleLogin = async (credential: string): Promise<User> => {
  const { token, user } = await apiRequest('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ credential }),
  });
  storeToken(token);
  return user;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (!getToken()) return null;
  try {
    return await apiRequest('/auth/me');
  } catch {
    logout();
    return null;
  }
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  return apiRequest('/auth/me', { method: 'PATCH', body: JSON.stringify(data) });
};

export const deleteAccount = async (): Promise<void> => {
  await apiRequest('/auth/me', { method: 'DELETE' });
  logout();
};
