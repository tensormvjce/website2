import React, { useState, useEffect } from 'react';
import logo from '../logo_white.png';

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    setTimeout(() => setShowLogo(true), 250);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setZoomIn(true);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setLoading(false);
              onLoadingComplete();
            }, 650);
          }, 600);
          return 100;
        }
        return prev + 1.25; // Adjusted for 4 sec duration
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!loading) return null;

  return (
    <div className={`min-h-screen bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative">
        {/* Constant glowing background effect */}
        <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30" />
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        
        {/* Logo */}
        <div className={`relative transition-all duration-1000 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative mb-12 flex justify-center">
            <img 
              src={logo}
              alt="Tensor Logo"
              className={`w-32 h-32 relative z-10 animate-float ${zoomIn ? 'animate-zoom-in' : ''}`}
            />
          </div>
        </div>

        <div className="relative mt-8">
          {/* Base text layer */}
          <div 
            className="text-[120px] font-bold tracking-[1rem] text-blue-400 select-none font-orbitron"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`,
              WebkitClipPath: `inset(${100 - progress}% 0 0 0)`,
            }}
          >
            T E N S O R
          </div>

          <div className="relative h-1 mt-8 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 transition-all duration-300 rounded-full"
              style={{ 
                width: `${progress}%`,
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shine_1s_linear_infinite]" />
            </div>
          </div>

          {/* Enhanced loading text */}
          <div className="mt-6 space-y-1">
            <div className={`text-xs text-gray-400 font-orbitron transition-all duration-300 tracking-wider ${progress > 20 ? 'opacity-100' : 'opacity-0'}`}>
              {">"} Initializing quantum processors... <span className="text-blue-400 font-bold">done</span>
            </div>
            <div className={`text-xs text-gray-400 font-orbitron transition-all duration-300 tracking-wider ${progress > 40 ? 'opacity-100' : 'opacity-0'}`}>
              {">"} Calibrating neural networks... <span className="text-blue-400 font-bold">{progress > 60 ? 'done' : 'in progress'}</span>
            </div>
            <div className={`text-xs text-gray-400 font-orbitron transition-all duration-300 tracking-wider ${progress > 60 ? 'opacity-100' : 'opacity-0'}`}>
              {">"} Optimizing tensor cores... <span className="text-blue-400 font-bold">{progress > 80 ? 'done' : 'in progress'}</span>
            </div>
            <div className={`text-xs text-gray-400 font-orbitron transition-all duration-300 tracking-wider ${progress > 80 ? 'opacity-100' : 'opacity-0'}`}>
              {">"} Establishing secure protocols... <span className="text-blue-400 font-bold">{progress > 95 ? 'done' : 'in progress'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;