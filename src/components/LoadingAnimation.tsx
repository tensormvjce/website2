import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import './LoadingAnimation.css';

interface LoadingAnimationProps {
  onLoadingComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const containerControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
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

  useEffect(() => {
    if (progress === 100) {
      const startTransition = async () => {
        // Start zoom
        setIsZooming(true);
        await containerControls.start({
          scale: 1.6,
          transition: { duration: 1.5, ease: [0.4, 0, 0.2, 1] }
        });
        
        console.log("Zoom complete, starting split");
        // Start split
        setIsSplitting(true);
      };
      
      setTimeout(startTransition, 500);
    }
  }, [progress, containerControls]);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="loading-wrapper">
          <motion.div
            className="loading-container"
            initial={{ scale: 1 }}
            animate={containerControls}
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <div 
              className="logo-container"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                backgroundColor: 'transparent'
              }}
            >
              {isSplitting ? (
                <div 
                  className="split-logo-container"
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    backgroundColor: 'transparent'
                  }}
                >
                  <motion.div
                    className="split-half top-part"
                    initial={{ x: 0, opacity: 1, scale: 1.4 }}
                    animate={{ 
                      x: 80,
                      opacity: 0,
                      scale: 1,
                      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                    }}
                  >
                    <img src="/logo-top.svg" alt="Logo Top" className="w-full h-full" />
                  </motion.div>
                  <motion.div
                    className="split-half bottom-part"
                    initial={{ x: 0, opacity: 1, scale: 1.4 }}
                    animate={{ 
                      x: -80,
                      opacity: 0,
                      scale: 1,
                      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                    }}
                  >
                    <img src="/logo-bottom.svg" alt="Logo Bottom" className="w-full h-full" />
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: isZooming ? 1 : 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src="/logo.svg" alt="Logo" className="w-32 h-32" />
                </motion.div>
              )}
            </div>
            <div className="mt-8 w-64 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                className="h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
