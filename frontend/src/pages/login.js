import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const from = location.state?.from?.pathname || '/dashboard';
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (error)
            setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await login(formData.email, formData.password);
            navigate(from, { replace: true });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Login failed. Please try again.');
            }
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Sign in to your account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/signup", className: "font-medium text-primary-600 hover:text-primary-500", children: "create a new account" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsxs("div", { className: "flex", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-400" }), _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-red-800", children: error }) })] }) })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: formData.email, onChange: handleInputChange, className: "mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm", placeholder: "Enter your email" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsxs("div", { className: "mt-1 relative", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? 'text' : 'password', autoComplete: "current-password", required: true, value: formData.password, onChange: handleInputChange, className: "appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm", placeholder: "Enter your password" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), "aria-label": "Toggle password visibility", children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("a", { href: "/forgot-password", className: "font-medium text-primary-600 hover:text-primary-500", children: "Forgot your password?" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Signing in..."] })) : ('Sign in') }) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-gray-50 text-gray-500", children: "New to our platform?" }) })] }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/signup", className: "w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Create new account" }) })] })] }) }));
};
export default LoginPage;
