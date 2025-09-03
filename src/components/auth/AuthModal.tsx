import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'instructor'], {
    required_error: 'Please select a role'
  })
});

type LoginFormData = z.infer<typeof loginSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError('');
      const success = await login(data.email, data.password, data.role);
      
      if (success) {
        reset();
        onClose();
      } else {
        setAuthError('Invalid credentials. Use password123 for demo.');
      }
    } catch (error) {
      setAuthError('An error occurred. Please try again.');
    }
  };

  const handleClose = () => {
    reset();
    setAuthError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In to LearnHub">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Demo Credentials */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <div>Student: student@example.com</div>
            <div>Instructor: instructor@example.com</div>
            <div>Password: password123</div>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            I want to sign in as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <input
                type="radio"
                value="student"
                {...register('role')}
                className="sr-only"
              />
              <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Student</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Learn new skills</div>
                </div>
              </div>
            </motion.label>
            
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <input
                type="radio"
                value="instructor"
                {...register('role')}
                className="sr-only"
              />
              <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors has-[:checked]:border-green-500 has-[:checked]:bg-green-50 dark:has-[:checked]:bg-green-900/20">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Instructor</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Teach others</div>
                </div>
              </div>
            </motion.label>
          </div>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Auth Error */}
        {authError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {authError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </Modal>
  );
}