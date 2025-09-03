import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Courses } from './components/sections/Courses';
import { About } from './components/sections/About';
import { CallToAction } from './components/sections/CallToAction';
import { Contact } from './components/sections/Contact';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileModal } from './components/profile/ProfileModal';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header onShowProfile={() => setShowProfileModal(true)} />
      
      <main>
        <Hero onShowAuth={() => setShowAuthModal(true)} />
        <Courses onShowAuth={() => setShowAuthModal(true)} />
        <About />
        <CallToAction onShowAuth={() => setShowAuthModal(true)} />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
          />
        )}
        {showProfileModal && (
          <ProfileModal 
            isOpen={showProfileModal} 
            onClose={() => setShowProfileModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;