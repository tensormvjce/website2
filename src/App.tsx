import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import StarryNightTransition from './components/StarryNightTransition';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <div className="relative min-h-screen bg-black">
        {/* Loading Screen */}
        <AnimatePresence mode="wait">
          {loading && (
            <div className="relative z-50">
              <LoadingScreen onLoadingComplete={handleLoadingComplete} />
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
                <AppRoutes />
              </div>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;