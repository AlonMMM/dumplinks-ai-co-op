import type { User } from '../types';

const TOKEN_KEY = 'dumplinks_jwt';
const USER_DATA_KEY = 'dumplinks_user_data';

const createFakeToken = (user: { email: string }): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ email: user.email, iat: Date.now() / 1000 }));
  return `${header}.${payload}.mock-signature`;
};

export const register = async (email: string, password: string): Promise<User> => {
  await new Promise(res => setTimeout(res, 1000));
  if (!email || !password) throw new Error('Email and password are required.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters long.');
  const user: User = { email, name: email.split('@')[0] };
  localStorage.setItem(TOKEN_KEY, createFakeToken(user));
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  return user;
};

export const login = async (email: string, password: string): Promise<User> => {
  await new Promise(res => setTimeout(res, 1000));
  if (!email || !password) throw new Error('Invalid email or password.');
  const user: User = { email, name: email.split('@')[0] };
  localStorage.setItem(TOKEN_KEY, createFakeToken(user));
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  return user;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const stored = localStorage.getItem(USER_DATA_KEY);
    if (stored) return JSON.parse(stored);
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { email: payload.email, name: payload.email.split('@')[0] };
  } catch {
    return null;
  }
};

export const updateUser = async (updatedData: Partial<User>): Promise<User> => {
  await new Promise(res => setTimeout(res, 500));
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  const newUser = { ...currentUser, ...updatedData };
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
  return newUser;
};

export const deleteAccount = async (): Promise<void> => {
  await new Promise(res => setTimeout(res, 1000));
  if (!getCurrentUser()) throw new Error('Not authenticated');
  logout();
};
