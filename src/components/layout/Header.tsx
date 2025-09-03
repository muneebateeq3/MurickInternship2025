import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { AuthModal } from '../auth/AuthModal';

interface HeaderProps {
  onShowProfile: () => void;
}

export function Header({ onShowProfile }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">LearnHub</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onShowProfile}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Button onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Contact
              </button>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                {isAuthenticated && user ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => { onShowProfile(); setIsMenuOpen(false); }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                      <span>{user.name}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                    className="w-full px-3 py-2 text-left text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}