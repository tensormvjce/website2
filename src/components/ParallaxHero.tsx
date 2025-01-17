import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BlackHoleBackground from '../pages/Home';

const ParallaxHero: React.FC = () => {
  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Black Hole Background */}
      <div className="absolute inset-0 bg-black">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <BlackHoleBackground />
        </Canvas>
      </div>

      {/* Welcome Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
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
          <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text tracking-tightglitch"
                data-text="TENSOR CLUB">
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
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm tracking-widest uppercase">Scroll to Explore</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParallaxHero;
