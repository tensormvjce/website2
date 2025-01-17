import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface LockedButtonProps {
  text: string;
  className?: string;
}

const LockedButton: React.FC<LockedButtonProps> = ({ text, className = '' }) => {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
      initial="initial"
    >
      {/* Locked Overlay */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg 
                 flex flex-col items-center justify-center z-10"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <Lock className="w-8 h-8 text-purple-400/80 mb-2" />
        </motion.div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-purple-300/90 font-medium text-sm"
        >
          Applications are closed
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-purple-400/60 text-xs mt-1"
        >
          Stay tuned
        </motion.p>
      </motion.div>

      {/* Button */}
      <button
        className={`relative px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                   border border-purple-500/50 rounded-lg font-semibold text-lg 
                   hover-glow terminal-text ${className}
                   disabled:cursor-not-allowed`}
        disabled
      >
        {/* Button text */}
        <span className="relative z-0">{text}</span>
      </button>
    </motion.div>
  );
};

export default LockedButton;
