import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';
const Step2 = ({ formData, updateFormData, onSubmit, onBack, loading = false, }) => {
    const [errors, setErrors] = useState({});
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (formData.phone && !/^[+\d\s\-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        if (!agreeToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
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
            onSubmit();
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Complete Your Profile" }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Step 2 of 2: Personal Details" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "firstName", className: "block text-sm font-medium text-gray-700", children: "First Name" }), _jsx("input", { id: "firstName", name: "firstName", type: "text", required: true, value: formData.firstName, onChange: handleInputChange, className: `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Enter your first name" }), errors.firstName && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.firstName] }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "lastName", className: "block text-sm font-medium text-gray-700", children: "Last Name" }), _jsx("input", { id: "lastName", name: "lastName", type: "text", required: true, value: formData.lastName, onChange: handleInputChange, className: `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Enter your last name" }), errors.lastName && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.lastName] }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Phone Number (Optional)" }), _jsx("input", { id: "phone", name: "phone", type: "tel", value: formData.phone, onChange: handleInputChange, className: `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.phone ? 'border-red-300' : 'border-gray-300'}`, placeholder: "Enter your phone number" }), errors.phone && (_jsxs("div", { className: "mt-1 flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.phone] }))] }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "agree-terms", name: "agree-terms", type: "checkbox", checked: agreeToTerms, onChange: (e) => {
                                                setAgreeToTerms(e.target.checked);
                                                if (errors.terms) {
                                                    setErrors(prev => ({ ...prev, terms: '' }));
                                                }
                                            }, className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }) }), _jsx("div", { className: "ml-3 text-sm", children: _jsxs("label", { htmlFor: "agree-terms", className: "text-gray-700", children: ["I agree to the", ' ', _jsx("a", { href: "/terms", target: "_blank", rel: "noopener noreferrer", className: "text-primary-600 hover:text-primary-500 underline", children: "Terms and Conditions" }), ' ', "and", ' ', _jsx("a", { href: "/privacy", target: "_blank", rel: "noopener noreferrer", className: "text-primary-600 hover:text-primary-500 underline", children: "Privacy Policy" })] }) })] }), errors.terms && (_jsxs("div", { className: "flex items-center text-sm text-red-600", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), errors.terms] })), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "newsletter", name: "newsletter", type: "checkbox", className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }) }), _jsx("div", { className: "ml-3 text-sm", children: _jsx("label", { htmlFor: "newsletter", className: "text-gray-700", children: "I would like to receive updates and marketing communications via email" }) })] })] }), _jsxs("div", { className: "flex space-x-4 pt-6", children: [_jsxs("button", { type: "button", onClick: onBack, className: "flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx(ArrowLeft, { className: "mr-2 w-4 h-4" }), "Back"] }), _jsx("button", { type: "submit", disabled: loading, className: "flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Creating Account..."] })) : (_jsxs(_Fragment, { children: [_jsx(Check, { className: "mr-2 w-4 h-4" }), "Create Account"] })) })] })] }), _jsxs("div", { className: "text-center text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx("a", { href: "/login", className: "text-primary-600 hover:text-primary-500 font-medium", children: "Sign in here" })] })] }));
};
export default Step2;
