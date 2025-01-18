import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import './LoadingAnimation.css';

interface LoadingAnimationProps {
  onLoadingComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPuzzleOut, setShowPuzzleOut] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const containerControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, 2500);
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
        
        // Start puzzle effect after split starts
        setTimeout(() => {
          console.log("Starting puzzle effect");
          setShowPuzzleOut(true);
        }, 400);
      };
      
      setTimeout(startTransition, 500);
    }
  }, [progress, containerControls]);

  // Helper function to calculate piece movement
  const calculatePieceMovement = (index: number, total: number, gridSize: number) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const centerOffset = (gridSize - 1) / 2;
    const centerX = col - centerOffset;
    const centerY = row - centerOffset;
    const angle = Math.atan2(centerY, centerX);
    const distance = Math.sqrt(centerX * centerX + centerY * centerY);
    const maxDistance = Math.sqrt(2) * centerOffset;
    const normalizedDistance = distance / maxDistance;
    
    const moveDistance = 40 + (normalizedDistance * 80); // Gentler movement
    const moveX = Math.cos(angle) * moveDistance;
    const moveY = Math.sin(angle) * moveDistance;
    
    return {
      x: moveX,
      y: moveY,
      rotate: (angle * (180 / Math.PI)) + (Math.random() * 15 - 7.5), // Reduced rotation
      scale: 1 + (normalizedDistance * 0.15), // Subtle scale
      delay: normalizedDistance * 0.4 // Smoother wave effect
    };
  };

  // Create background pieces (5x5 grid)
  const backgroundPieces = Array.from({ length: 25 }, (_, i) => {
    const movement = calculatePieceMovement(i, 25, 5);
    return {
      ...movement,
      opacity: 0
    };
  });

  // Create logo pieces (4x4 grid for more detail)
  const logoPieces = Array.from({ length: 16 }, (_, i) => {
    const movement = calculatePieceMovement(i, 16, 4);
    return {
      ...movement,
      opacity: 0
    };
  });

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="loading-wrapper">
          {/* Main content with logo and progress bar */}
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
            {/* Logo */}
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
                  {/* Top-right part */}
                  <motion.div
                    className="split-half top-part"
                    initial={{ x: 0, opacity: 1, scale: 1.4 }}
                    animate={{ 
                      x: 80,
                      opacity: 0,
                      scale: 1.4
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.6, delay: 0.2 }
                    }}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 128 128">
                      <defs>
                        <clipPath id="topMask">
                          <path d="M0 0 L128 0 L128 128 L32 52 Z" />
                        </clipPath>
                      </defs>
                      <image
                        href="/logo_white.png"
                        width="128"
                        height="128"
                        clipPath="url(#topMask)"
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none'
                        }}
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Bottom-left part */}
                  <motion.div
                    className="split-half bottom-part"
                    initial={{ x: 0, opacity: 1, scale: 1.4 }}
                    animate={{ 
                      x: -80,
                      opacity: 0,
                      scale: 1.4
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.6, delay: 0.2 }
                    }}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 128 128">
                      <defs>
                        <clipPath id="bottomMask">
                          <path d="M0 0 L32 52 L128 128 L0 128 Z" />
                        </clipPath>
                      </defs>
                      <image
                        href="/logo_white.png"
                        width="128"
                        height="128"
                        clipPath="url(#bottomMask)"
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none'
                        }}
                      />
                    </svg>
                  </motion.div>
                </div>
              ) : (
                <motion.img
                  src="/logo_white.png"
                  alt="Tensor Logo"
                  className="w-32 h-32"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1.4,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.8
                    }
                  }}
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    backgroundColor: 'transparent'
                  }}
                />
              )}
            </div>

            {/* Progress Bar */}
            <motion.div 
              className="mt-32 w-64 absolute bottom-32 left-1/2 -translate-x-1/2"
              animate={{
                opacity: isZooming ? 0 : 1
              }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
