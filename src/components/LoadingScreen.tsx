import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/src/logo_white.png';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, 800); // Match this with exit animation duration
    }, 2500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          // Faster at start, slower towards end
          const increment = prevProgress < 80 ? 3 : 1;
          const nextProgress = prevProgress + increment;
          return Math.min(nextProgress, 100);
        }
        return prevProgress;
      });
    }, 40);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const LogoContent = () => (
    <div className="relative">
      {/* Logo highlight effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-48 h-48 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1, 0.8],
            background: [
              'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(147,51,234,0) 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.5) 0%, rgba(147,51,234,0) 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(147,51,234,0) 70%)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 w-48 h-48 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            background: [
              'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(96,165,250,0) 70%)',
              'radial-gradient(circle, rgba(96,165,250,0.5) 0%, rgba(96,165,250,0) 70%)',
              'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(96,165,250,0) 70%)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Tensor AI Logo"
        className="w-40 h-40 object-contain relative z-10 mb-8"
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
            'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))',
            'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative flex flex-col items-center"
          >
            <LogoContent />
            
            {/* Loading Progress */}
            <div className="mt-12 w-64">
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600"
                  style={{ width: `${progress}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
              <motion.div 
                className="mt-2 text-center font-mono text-sm"
                animate={{
                  color: ['#C4B5FD', '#818CF8', '#C4B5FD'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {progress < 25 && "Initializing..."}
                {progress >= 25 && progress < 50 && "Loading Assets..."}
                {progress >= 50 && progress < 75 && "Preparing UI..."}
                {progress >= 75 && progress < 90 && "Almost Ready..."}
                {progress >= 90 && progress < 100 && "Final Touches..."}
                {progress === 100 && "Ready!"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
