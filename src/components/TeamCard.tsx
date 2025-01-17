import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../data/teamData';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center space-x-4 p-4 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-300">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover relative"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`;
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-gray-400 text-sm">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
