import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface CallToActionProps {
  onShowAuth: () => void;
}

export function CallToAction({ onShowAuth }: CallToActionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Career?
          </motion.h2>
          
          <motion.p
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of successful students who have already advanced their careers with our courses. 
            Start your journey today and unlock unlimited possibilities.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
              <Button 
                onClick={onShowAuth}
                variant="secondary"
                size="lg"
                icon={BookOpen}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
              >
                Start as Student
              </Button>
              
              <Button 
                onClick={onShowAuth}
                variant="outline"
                size="lg"
                icon={Users}
                className="w-full border-white text-white hover:bg-white hover:text-gray-900"
              >
                Become Instructor
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Success Rate', value: '94%' },
              { label: 'Course Completion', value: '87%' },
              { label: 'Job Placement', value: '78%' },
              { label: 'Satisfaction', value: '4.8/5' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-200 text-sm">
              ✨ 30-day money-back guarantee • No commitment required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}