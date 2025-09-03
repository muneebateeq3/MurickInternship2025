import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit3, Save, X, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  avatar: z.string().url('Please enter a valid URL').optional().or(z.literal(''))
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
    setIsEditing(false);
  };

  const handleClose = () => {
    if (isEditing && isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        reset();
        setIsEditing(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleEdit = () => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="User Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative inline-block">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
            )}
            <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'instructor' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {user.role === 'instructor' ? 'Instructor' : 'Student'}
            </div>
          </div>
        </div>

        {isEditing ? (
          // Edit Mode
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture URL (optional)
              </label>
              <input
                type="url"
                {...register('avatar')}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio (optional)
              </label>
              <textarea
                {...register('bio')}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" icon={Save} className="flex-1">
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                icon={X} 
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Full Name</div>
                  <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                  <div className="font-medium text-gray-900 dark:text-white">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {user.bio && (
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bio</div>
                  <p className="text-gray-900 dark:text-white leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button onClick={handleEdit} icon={Edit3} className="w-full">
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}