import React from 'react';
import { motion } from 'framer-motion';

const ScrollToExplore: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 cursor-pointer z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }}
    >
      <span className="text-sm font-light tracking-widest uppercase">Scroll to explore</span>
      <motion.div
        className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
        initial={{ opacity: 0.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full"
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
    </motion.div>
  );
};

export default ScrollToExplore;
