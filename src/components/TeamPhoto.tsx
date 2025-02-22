import React from 'react';
import { motion } from 'framer-motion';

interface TeamPhotoProps {
  photo: string;
  year: string;
}

const TeamPhoto: React.FC<TeamPhotoProps> = ({ photo, year }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12 max-w-2xl mx-auto group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative h-48 overflow-hidden rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors duration-300">
        <img
          src={photo}
          alt={`Team ${year}`}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-lg font-semibold text-center glow-text">
            Team {year}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamPhoto;
