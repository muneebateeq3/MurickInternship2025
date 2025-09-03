import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '../common/Button';

interface HeroProps {
  onShowAuth: () => void;
}

export function Hero({ onShowAuth }: HeroProps) {
  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full opacity-20 blur-lg"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master New Skills
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Transform Your Future
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join thousands of learners worldwide and unlock your potential with our expert-led courses. 
            Learn at your own pace, build real projects, and advance your career.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button onClick={scrollToCourses} size="lg" className="w-full sm:w-auto">
              Explore Courses
            </Button>
            <Button 
              onClick={onShowAuth} 
              variant="outline" 
              size="lg" 
              icon={PlayCircle}
              className="w-full sm:w-auto"
            >
              Start Learning
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Users, label: 'Active Students', value: '10,000+' },
              { icon: BookOpen, label: 'Courses', value: '500+' },
              { icon: Award, label: 'Certificates', value: '15,000+' },
              { icon: PlayCircle, label: 'Video Hours', value: '2,000+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}