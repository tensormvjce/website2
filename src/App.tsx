import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnimation from './components/LoadingAnimation';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Registrations from './pages/Registrations';
import CustomCursor from './components/CustomCursor';
import ChatBot from './components/ChatBot';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    return !hasVisited;
  });
  const [showContent, setShowContent] = useState(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    return !!hasVisited;
  });

  useEffect(() => {
    // If this is not the first visit, skip loading
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    setShowContent(true);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  return (
    <>
      <Toaster position="top-right" />
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
                <ErrorBoundary>
                  <Navbar />
                  <div className="min-h-screen text-white">
                    <Routes>
                      <Route path="/blogs" element={<Blog />} />
                      <Route path="/registrations" element={<Registrations />} />
                      <Route path="*" element={<AppRoutes />} />
                    </Routes>
                  </div>
                  <Footer />
                  <ChatBot />
                </ErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </>
  );
}

export default App;