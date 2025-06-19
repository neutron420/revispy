import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, userAPI } from '@/services/api';
import { trpc } from '@/utils/trpc';
import type { AuthContextType, User, SignupData, UserProfile } from '@/types';
import { AxiosError } from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const logoutMutation = trpc.auth.logout.useMutation();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem('auth_token');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        setUser(userData);
        localStorage.setItem('auth_token', token);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      throw new Error(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    try {
      setLoading(true);
      const response = await authAPI.signup(userData);
      if (response.success && response.data) {
        const { user: newUser, token } = response.data;
        setUser(newUser);
        localStorage.setItem('auth_token', token);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      throw new Error(err.response?.data?.message || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    try {
      const response = await userAPI.updateProfile(data);
      if (response.success && response.data && user) {
        setUser({
          ...user,
          profile: response.data,
        });
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      throw new Error(err.response?.data?.message || err.message || 'Update failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
