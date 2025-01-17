import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BlackHoleBackground from '../pages/Home';

const ParallaxHero: React.FC = () => {
  const { scrollY } = useScroll();

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
          <motion.group scale={transforms.backgroundScale}>
            <BlackHoleBackground />
          </motion.group>
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl md:text-8xl font-bold text-white text-center mb-6 tracking-wider glitch"
          data-text="WELCOME TO"
        >
          WELCOME TO
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative"
        >
          <h1 
            className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text tracking-tight glitch"
            data-text="TENSOR CLUB"
          >
            TENSOR CLUB
          </h1>
          <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-400/30 to-purple-600/30 -z-10" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10"
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

      {/* Very gradual darkening overlay */}
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
