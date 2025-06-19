import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Step1 from './pages/signup/Step1';
import Step2 from './pages/signup/Step2';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
// Signup Flow Wrapper Component
const SignupFlow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Step 1 form data
    const [step1Data, setStep1Data] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    // Step 2 form data
    const [step2Data, setStep2Data] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const updateStep1Data = (data) => {
        setStep1Data(prev => ({ ...prev, ...data }));
    };
    const updateStep2Data = (data) => {
        setStep2Data(prev => ({ ...prev, ...data }));
    };
    const handleStep1Next = () => {
        navigate('/signup/step2');
    };
    const handleStep2Back = () => {
        navigate('/signup/step1');
    };
    const handleStep2Submit = async () => {
        setLoading(true);
        try {
            // Combine both steps' data for final submission
            const completeFormData = {
                ...step1Data,
                ...step2Data,
            };
            // Handle final form submission here
            console.log('Form submitted:', completeFormData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Navigate to dashboard or success page
            navigate('/dashboard');
        }
        catch (error) {
            console.error('Signup failed:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (location.pathname === '/signup/step1') {
        return (_jsx(Step1, { formData: step1Data, updateFormData: updateStep1Data, onNext: handleStep1Next }));
    }
    if (location.pathname === '/signup/step2') {
        return (_jsx(Step2, { formData: step2Data, updateFormData: updateStep2Data, onSubmit: handleStep2Submit, onBack: handleStep2Back, loading: loading }));
    }
    return _jsx(Navigate, { to: "/signup/step1" });
};
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup/step1", element: _jsx(SignupFlow, {}) }), _jsx(Route, { path: "/signup/step2", element: _jsx(SignupFlow, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard" }) })] }));
};
export default App;
