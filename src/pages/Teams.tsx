import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
  year: string;
}

interface TeamYear {
  year: string;
  members: TeamMember[];
}

const Teams = () => {
  const { items: teamData, loading, error } = useFirestoreCollection<TeamYear>(db, 'teams');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredTeamData = selectedYear === 'all' 
    ? teamData 
    : teamData.filter(year => year.year === selectedYear);

  const years = ['all', ...new Set(teamData.map(year => year.year))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center glow-text">Our Team</h1>
      
      {/* Year Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${selectedYear === year 
                ? 'bg-purple-500/40 text-white' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'}`}
          >
            {year === 'all' ? 'All Years' : year}
          </button>
        ))}
      </div>

      {/* Team Members Grid */}
      <div className="space-y-12">
        {[...filteredTeamData].reverse().map((yearData: TeamYear) => (
          <div key={yearData.year} className="space-y-6">
            <h2 className="text-2xl font-semibold glow-text">{yearData.year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {yearData.members.map((member, memberIndex) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: memberIndex * 0.1 }}
                  className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover-glow"
                >
                  <div className="relative mb-4">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;