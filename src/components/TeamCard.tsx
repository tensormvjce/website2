import React from 'react';
import { TeamMember } from '../data/teamData';

interface TeamCardProps {
  member: TeamMember
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const handleLinkedInClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getImageSource = (member: TeamMember) => {
    if (member.photo && member.photo !== '') {
      return member.photo;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`;
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-lg text-center">
      {member.linkedin ? (
        <div 
          onClick={(e) => handleLinkedInClick(e, member.linkedin)}
          className="cursor-pointer"
        >
          <img
            src={getImageSource(member)}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 hover:opacity-80 transition-opacity"
          />
        </div>
      ) : (
        <img
          src={getImageSource(member)}
          alt={member.name}
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
