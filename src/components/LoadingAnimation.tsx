import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingAnimation.css';

interface LoadingAnimationProps {
  onLoadingComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, 800);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          const increment = prevProgress < 80 ? 2 : 1;
          const nextProgress = prevProgress + increment;
          return Math.min(nextProgress, 100);
        }
        return prevProgress;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="body">
            <span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div className="base">
              <span></span>
              <div className="face"></div>
            </div>
          </div>
          <div className="longfazers">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mt-32 w-64 absolute bottom-32 left-1/2 -translate-x-1/2">
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
              className="mt-2 text-center font-mono text-sm text-white"
              animate={{
                color: ['#C4B5FD', '#818CF8', '#C4B5FD'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
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
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
