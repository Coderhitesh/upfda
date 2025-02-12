"use client"
import React, { useState } from 'react';
import { Phone, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNo: '',
    Password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://www.test.blueaceindia.com/api/v1/login', formData);
      const { token, user } = res.data;

      if (typeof window !== "undefined") {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/profile';
      }

      toast.success(res.data.message || 'Login Successfully');
    } catch (error) {
      console.log("Internal server error", error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ffe3e5] mb-4">
              <LogIn className="w-8 h-8 text-[#E2000A]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Please sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
                    focus:ring-2 focus:ring-[#E2000A] focus:border-[#E2000A]
                    placeholder:text-gray-400 text-gray-900
                    transition duration-200 ease-in-out"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl 
                    focus:ring-2 focus:ring-[#E2000A] focus:border-[#E2000A]
                    placeholder:text-gray-400 text-gray-900
                    transition duration-200 ease-in-out"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#E2000A] rounded border-gray-300 focus:ring-[#E2000A]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/forget" className="text-sm text-[#E2000A] hover:text-[#E2000A] font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E2000A] text-white py-3 px-4 rounded-xl font-medium
                hover:bg-[#b30811] focus:outline-none focus:ring-2 focus:ring-[#E2000A] focus:ring-offset-2
                transform transition duration-200 ease-in-out hover:scale-[1.02]"
            >
              Sign in
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-[#E2000A] hover:text-[#E2000A]">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;