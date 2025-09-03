import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'student' | 'instructor') => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Doe',
    role: 'student' as const,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Computer Science student passionate about web development',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    email: 'instructor@example.com',
    name: 'Sarah Smith',
    role: 'instructor' as const,
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Senior Software Engineer with 8+ years of teaching experience',
    joinedDate: '2023-09-10'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'instructor'): Promise<boolean> => {
    // Mock authentication
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (user && password === 'password123') {
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    }
  };

  const value = {
    ...authState,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}