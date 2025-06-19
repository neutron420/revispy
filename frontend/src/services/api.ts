import axios, { AxiosError } from 'axios';
import type { ApiResponse, LoginCredentials, SignupData, User, UserProfile } from '../types';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('auth_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  signup: async (userData: SignupData): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw new Error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get current user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

// User Profile API
export const userAPI = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    try {
      const response = await api.put('/user/profile', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  uploadAvatar: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

// Categories API with proper typing
interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const categoriesAPI = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  create: async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Category>> => {
    try {
      const response = await api.post('/categories', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  update: async (id: string, data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<Category>> => {
    try {
      const response = await api.put(`/categories/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

// Dashboard API
interface DashboardStats {
  totalUsers: number;
  totalCategories: number;
  totalRevenue: number;
  activeUsers: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export const dashboardAPI = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get dashboard stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};

export default api;