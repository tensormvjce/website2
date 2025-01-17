import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamData, TeamYear, TeamMember } from '../data/teamData';
import TeamCard from '../components/TeamCard';
import TeamPhoto from '../components/TeamPhoto';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Teams = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const handleYearClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleTeamExpand = (team: string) => {
    setExpandedTeam(expandedTeam === team ? null : team);
  };

  const groupMembersByDepartment = (members: TeamMember[]) => {
    return members.reduce((acc, member) => {
      if (member.department) {
        if (!acc[member.department]) {
          acc[member.department] = [];
        }
        acc[member.department].push(member);
      }
      return acc;
    }, {} as { [key: string]: TeamMember[] });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 glitch"
          data-text="Tensor Timeline"
        >
          Tensor Timeline
        </motion.h1>

        {/* AI Journey Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-purple-400/80 text-center mb-12 italic"
        >
          The AI Odyssey: From Code to Cosmic Frontiers
        </motion.h2>

        {/* Timeline Container */}
        <div className="flex flex-col items-center relative">
          {/* Continuous Timeline Line */}
          <div className="absolute top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/50 to-transparent" />

          {[...teamData].reverse().map((yearData: TeamYear, index) => (
            <div key={yearData.year} className="relative w-full flex flex-col items-center">
              {/* Year Button */}
              <div className="relative z-10">
                <button
                  onClick={() => handleYearClick(yearData.year)}
                  className={`w-24 h-24 rounded-xl bg-gradient-to-r 
                    ${selectedYear === yearData.year 
                      ? 'from-purple-500/40 to-blue-500/40 border-purple-500' 
                      : 'from-purple-500/20 to-blue-500/20 border-purple-500/50'} 
                    border flex items-center justify-center hover-glow transition-all duration-300`}
                >
                  <span className="text-2xl font-bold">{yearData.year}</span>
                </button>
              </div>

              {/* Content Area */}
              <div className="w-full max-w-6xl mt-8 mb-16">
                <AnimatePresence>
                  {selectedYear === yearData.year && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-16"
                    >
                      {/* Background to hide timeline line */}
                      <div className="absolute inset-0 bg-black z-0" />
                      
                      {/* Content */}
                      <div className="relative z-10 bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800">
                        {/* Team Photo */}
                        <TeamPhoto photo={yearData.teamPhoto} year={yearData.year} />

                        {/* Core Team */}
                        <div className="mb-8">
                          <button
                            onClick={() => handleTeamExpand('Core Team')}
                            className="flex items-center space-x-2 text-xl font-semibold mb-4 hover:text-purple-400 transition-colors"
                          >
                            <span>Core Team</span>
                            {expandedTeam === 'Core Team' ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedTeam === 'Core Team' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                              >
                                {yearData.members
                                  .filter(member => member.category === 'Core Team')
                                  .map((member, index) => (
                                    <TeamCard key={member.name} member={member} index={index} />
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Sub Teams */}
                        <div>
                          <button
                            onClick={() => handleTeamExpand('Sub-Team Members')}
                            className="flex items-center space-x-2 text-xl font-semibold mb-4 hover:text-purple-400 transition-colors"
                          >
                            <span>Sub-Team Members</span>
                            {expandedTeam === 'Sub-Team Members' ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedTeam === 'Sub-Team Members' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-8"
                              >
                                {Object.entries(
                                  groupMembersByDepartment(yearData.members)
                                ).map(([department, members]) => (
                                  <div key={department}>
                                    <h3 className="text-lg font-semibold mb-4 text-purple-400">
                                      {department}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                      {members.map((member, index) => (
                                        <TeamCard key={member.name} member={member} index={index} />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;