import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnimation from './components/LoadingAnimation';
import StarryNightTransition from './components/StarryNightTransition';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Registrations from './pages/Registrations';
import CustomCursor from './components/CustomCursor';
import ChatBot from './components/ChatBot';

function App() {
  const [loading, setLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    setShowTransition(true);
  };

  const handleEnterPress = () => {
    setShowTransition(false);
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <Router>
      <CustomCursor />
      <div className="relative min-h-screen bg-black">
        {/* Loading Screen */}
        <AnimatePresence mode="wait">
          {loading && (
            <div className="relative z-50">
              <LoadingAnimation onLoadingComplete={handleLoadingComplete} />
            </div>
          )}
        </AnimatePresence>

        {/* Starry Night Transition */}
        <AnimatePresence mode="wait">
          {showTransition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-40"
            >
              <StarryNightTransition onEnter={handleEnterPress} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
              className="relative z-30"
            >
              <Navbar />
              <div className="min-h-screen text-white">
                <Routes>
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/registrations" element={<Registrations />} />
                  <Route path="*" element={<AppRoutes />} />
                </Routes>
              </div>
              <Footer />
              <ChatBot />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;