import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
const Step1 = ({ formData, updateFormData, onNext, onBack, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onNext();
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Create Your Account" }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Step 1 of 2: Basic Information" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }), _jsx("input", { id: "name", name: "name", type: "text", required: true, value: formData.name, onChange: handleInputChange, className: `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.name ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Enter your full name" }), errors.name && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.name] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email Address" }), _jsx("input", { id: "email", name: "email", type: "email", required: true, value: formData.email, onChange: handleInputChange, className: `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Enter your email address" }), errors.email && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.email] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsxs("div", { className: "mt-1 relative", children: [_jsx("input", { id: "password", name: "password", type: showPassword ? 'text' : 'password', required: true, value: formData.password, onChange: handleInputChange, className: `block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.password ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Create a strong password" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] }), errors.password && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.password] })), _jsx("div", { className: "mt-1 text-xs text-gray-500", children: "Password must be at least 8 characters with uppercase, lowercase, and number" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700", children: "Confirm Password" }), _jsxs("div", { className: "mt-1 relative", children: [_jsx("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', required: true, value: formData.confirmPassword, onChange: handleInputChange, className: `block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Confirm your password" }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] }), errors.confirmPassword && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.confirmPassword] }))] }), _jsxs("div", { className: "flex space-x-4 pt-4", children: [onBack && (_jsx("button", { type: "button", onClick: onBack, className: "flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Back" })), _jsxs("button", { type: "submit", className: "flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 w-4 h-4" })] })] })] })] }));
};
export default Step1;
