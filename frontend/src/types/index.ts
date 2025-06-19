export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  itemCount: number;
}

export interface DashboardStats {
  totalCategories: number;
  totalItems: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'deleted';
  title: string;
  timestamp: string;
}

// Additional interfaces that might be needed for your dashboard
export interface DashboardData {
  stats: DashboardStats;
  categories: Category[];
  recentActivity: ActivityItem[];
}