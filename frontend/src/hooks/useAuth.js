import { useAuth as useAuthContext } from '@/context/AuthContext';
export const useAuth = () => {
    return useAuthContext();
};
export const useAuthToken = () => {
    return localStorage.getItem('auth_token');
};
export const useIsAuthenticated = () => {
    const { user, loading } = useAuth();
    return { isAuthenticated: !!user, loading };
};
