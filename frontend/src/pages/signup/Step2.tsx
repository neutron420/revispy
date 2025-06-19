import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';

interface Step2Props {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  updateFormData: (data: Partial<Step2Props['formData']>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  onSubmit,
  onBack,
  loading = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
        <p className="mt-2 text-sm text-gray-600">Step 2 of 2: Personal Details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => {
                  setAgreeToTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agree-terms" className="text-gray-700">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-500 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
          {errors.terms && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.terms}
            </div>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="newsletter" className="text-gray-700">
                I would like to receive updates and marketing communications via email
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              <>
                <Check className="mr-2 w-4 h-4" />
                Create Account
              </>
            )}
          </button>
        </div>
      </form>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
          Sign in here
        </a>
      </div>
    </div>
  );
};

export default Step2;