import React from 'react';
import { TeamMember } from '../data/teamData';

interface TeamCardProps {
  member: TeamMember
}

const TeamCard: React.FC<TeamCardProps> = ({ member}) => {
  const handleLinkedInClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/avatars/default.jpg'; // Fallback image
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-lg text-center">
      {member.linkedin ? (
        <div 
          onClick={(e) => handleLinkedInClick(e, member.linkedin)}
          className="cursor-pointer"
        >
          <img
            src={member.photo}
            alt={member.name}
            onError={handleImageError}
            className="w-32 h-32 rounded-full mx-auto mb-4 hover:opacity-80 transition-opacity"
          />
        </div>
      ) : (
        <img
          src={member.photo}
          alt={member.name}
          onError={handleImageError}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
      <p className="text-gray-300 mb-2">{member.role}</p>
      {member.department && (
        <p className="text-gray-400">{member.department}</p>
      )}
    </div>
  );
};

export default TeamCard;
