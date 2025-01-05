import React, { useState } from "react";

import { Card, CardHeader, CardContent, CardFooter } from "../../../components/ui/card";
import { Mail, Lock, ArrowRight, Users, ShieldCheck } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

interface Credentials {
  email: string;
  password: string;
}

export const LoginForm = ({
  isAdmin,
  onSubmit,
}: {
  isAdmin: boolean;
  onSubmit: (credentials: Credentials) => Promise<void>;
}) => {
  const [formData, setFormData] = useState<Credentials>({
    email: "test@gmail.com",
    password: "1234567890",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
              {isAdmin ? (
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              ) : (
                <Users className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900">
              {isAdmin ? "Admin Login" : "User Login"}
            </h2>
            <p className="text-center text-gray-600">
              Welcome back! Please enter your credentials to continue.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    className={`pl-10 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className={`pl-10 ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full group bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
              >
                <span>Sign in</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-600">
            {isAdmin ? (
              <p>Need a user account? <a href="/login" className="text-blue-600 hover:text-blue-500">Switch to user login</a></p>
            ) : (
              <p>Are you an admin? <a href="/admin/login  " className="text-blue-600 hover:text-blue-500">Switch to admin login</a></p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;