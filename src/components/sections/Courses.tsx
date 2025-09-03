import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { featuredCourses } from '../../data/courses';
import { Button } from '../common/Button';

interface CoursesProps {
  onShowAuth: () => void;
}

export function Courses({ onShowAuth }: CoursesProps) {
  return (
    <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular courses, carefully crafted by industry experts to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.level === 'Beginner' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : course.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${course.price}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    by {course.instructor}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button onClick={onShowAuth} className="w-full">
                  Enroll Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" icon={BookOpen}>
            View All Courses
          </Button>
        </motion.div>
      </div>
    </section>
  );
}