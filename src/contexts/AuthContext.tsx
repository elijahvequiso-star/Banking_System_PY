import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  accountNumber: string;
  balance: number;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  withdraw: (amount: number) => boolean;
  deposit: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

//  Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      await api.post('/api/users/', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        username,
        password,
      });
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Signup error:', err.response?.data);
      }
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Get JWT tokens
      const { data: tokens } = await api.post('/api/token/', { username, password });

      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);

      // Fetch user profile with token
      const { data: profile } = await api.get('/api/user/me/', {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });

      setUser({
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        username: profile.username,
        phoneNumber: profile.phone_number,
        accountNumber: profile.account_number ?? '',
        balance: profile.balance ?? 0,
        role: profile.role,
      });

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Login error:', err.response?.data);
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const withdraw = (amount: number) => {
    if (!user || amount > user.balance || amount <= 0) return false;
    setUser({ ...user, balance: user.balance - amount });
    return true;
  };

  const deposit = (amount: number) => {
    if (!user || amount <= 0) return;
    setUser({ ...user, balance: user.balance + amount });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, withdraw, deposit }}>
      {children}
    </AuthContext.Provider>
  );
};