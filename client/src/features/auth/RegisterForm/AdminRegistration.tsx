import React, { useState } from 'react';
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "../../../components/ui/card";
import { 
  User, 
  Mail, 
  Lock, 
  Phone,
  Shield,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  adminCode: string;
}

const AdminRegistration = ({onSubmit}: {onSubmit: (data: RegistrationData) => void}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminCode: ''
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.adminCode.trim()) {
      newErrors.adminCode = 'Admin code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Add your registration logic here
        console.log('Registration data:', formData);
        // Simulate API call
        await onSubmit(formData);
        // Reset form after successful registration
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          adminCode: ''
        });
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-center">Admin Registration</CardTitle>
            <p className="text-center text-gray-600">Create a new administrator account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && (
                    <div className="flex items-center mt-1 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {errors.confirmPassword && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Department and Phone */}
              <div className="grid  gap-4">
              
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Code */}
              <div className="space-y-2">
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Admin Registration Code"
                    className={`pl-10 ${errors.adminCode ? 'border-red-500' : ''}`}
                    value={formData.adminCode}
                    onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                  />
                  {errors.adminCode && (
                    <div className="flex items-center mt-1 text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.adminCode}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full group"
                disabled={isSubmitting}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{isSubmitting ? 'Registering...' : 'Register Account'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-600">
            Already have an account? 
            <a href="/admin/login" className="text-blue-600 hover:text-blue-700 ml-1">
              Sign in
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegistration;