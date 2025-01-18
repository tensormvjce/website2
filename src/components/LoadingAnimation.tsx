import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          onLoadingComplete();
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-purple-500/20"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-purple-500"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-center mt-2 text-gray-400">
          Loading... {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
