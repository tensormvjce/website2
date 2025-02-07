import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BlackHoleBackground from '../pages/Home';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ParallaxHero: React.FC = () => {
  const { scrollY } = useScroll();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const scrollIndicatorRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  // Memoized transform values for performance
  const transforms = useMemo(() => {
    return {
      contentY: useTransform(scrollY, [0, 1000], [0, -200]),
      contentOpacity: useTransform(scrollY, [0, 800], [1, 0]),
      // Keep background visible longer with very gradual scale
      backgroundScale: useTransform(
        scrollY,
        [0, 1000, 2000, 3000, 4000, 5000],
        [1, 1.1, 1.2, 1.3, 1.4, 1.5],
        { clamp: false }
      ),
      // Super gradual opacity fade
      backgroundOpacity: useTransform(
        scrollY,
        [0, 2000, 3000, 4000, 5000, 6000],
        [1, 0.9, 0.7, 0.5, 0.3, 0],
        { clamp: true }
      )
    };
  }, [scrollY]);

  return (
    <div className="relative w-full" style={{ height: '600vh' }}>
      {/* Particle Background - Now fixed for entire scroll */}
      <motion.div 
        className="fixed inset-0 w-full h-screen"
        style={{ 
          opacity: transforms.backgroundOpacity,
          zIndex: 0
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 80 }}
          style={{ background: 'transparent' }}
        >
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <motion.div style={{ scale: transforms.backgroundScale }}>
            <BlackHoleBackground />
          </motion.div>
        </Canvas>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
        style={{
          y: transforms.contentY,
          opacity: transforms.contentOpacity,
          zIndex: 1
        }}
      >
        {/* Welcome Text - Reveal from Left */}
        <motion.h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white text-center mb-6 tracking-wider glitch reveal-from-left"
          data-text="WELCOME TO"
        >
          WELCOME TO
        </motion.h1>

        {/* Main Title - Scale In */}
        <motion.div
          ref={subtitleRef}
          className="relative scale-in"
        >
          <h1 
            className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text tracking-tight glitch"
            data-text="TENSOR CLUB"
          >
            TENSOR CLUB
          </h1>
          <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-400/30 to-purple-600/30 -z-10" />
        </motion.div>

        {/* Buttons - Fade In with Delay */}
        <div 
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 fade-in reveal-delay-2"
        >
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Join Us
          </button>
          <button className="px-8 py-3 border border-purple-500 hover:bg-purple-500/10 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Scroll Indicator - Fade In with Delay */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 fade-in reveal-delay-3"
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
            >
              <motion.div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div 
        className="fixed inset-0 w-full h-screen pointer-events-none bg-gradient-to-b from-transparent to-black/80"
        style={{
          opacity: useTransform(
            scrollY,
            [0, 1000, 2000, 3000, 4000, 5000],
            [0, 0.2, 0.4, 0.6, 0.8, 1]
          ),
          zIndex: 1
        }}
      />

      {/* Content spacer */}
      <div className="h-[200vh]" />
    </div>
  );
};

export default ParallaxHero;
