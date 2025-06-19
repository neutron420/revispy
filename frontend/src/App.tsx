import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Step1 from './pages/signup/Step1';
import Step2 from './pages/signup/Step2';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// Signup Flow Wrapper Component
const SignupFlow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step1Data, setStep1Data] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [step2Data, setStep2Data] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const updateStep1Data = (data: Partial<typeof step1Data>) => {
    setStep1Data(prev => ({ ...prev, ...data }));
  };

  const updateStep2Data = (data: Partial<typeof step2Data>) => {
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
      const completeFormData = {
        ...step1Data,
        ...step2Data,
      };

      console.log('Form submitted:', completeFormData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (location.pathname === '/signup/step1') {
    return (
      <Step1
        formData={step1Data}
        updateFormData={updateStep1Data}
        onNext={handleStep1Next}
      />
    );
  }

  if (location.pathname === '/signup/step2') {
    return (
      <Step2
        formData={step2Data}
        updateFormData={updateStep2Data}
        onSubmit={handleStep2Submit}
        onBack={handleStep2Back}
        loading={loading}
      />
    );
  }

  return <Navigate to="/signup/step1" />;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup/step1" element={<SignupFlow />} />
      <Route path="/signup/step2" element={<SignupFlow />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route should redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
