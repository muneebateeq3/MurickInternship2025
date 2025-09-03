import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Target,
      title: 'Expert-Led Learning',
      description: 'Learn from industry professionals with years of real-world experience in their fields.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a vibrant community of learners and get help from peers and mentors.'
    },
    {
      icon: Award,
      title: 'Verified Certificates',
      description: 'Earn certificates upon completion to showcase your skills to employers.'
    },
    {
      icon: Zap,
      title: 'Flexible Learning',
      description: 'Learn at your own pace with lifetime access to all course materials.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnHub?
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We're committed to providing the highest quality online education experience. 
              Our platform combines cutting-edge technology with expert instruction to help 
              you achieve your learning goals faster and more effectively.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students learning online"
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Certificate</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Earned</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Community</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">10k+ Members</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}