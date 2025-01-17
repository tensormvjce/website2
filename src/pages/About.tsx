import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Brain, Rocket, Users, Code, Award, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Members', value: '100+' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Workshops Conducted', value: '20+' },
    { label: 'Research Papers', value: '10+' },
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'National AI Competition Winners',
      description: 'First place in the National AI Innovation Challenge 2024'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Recognition',
      description: 'Featured in top AI research conferences and publications'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Open Source Contributors',
      description: 'Active contributors to major AI/ML open source projects'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="noise" />
        <div className="grid-background fixed inset-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 glitch"
              data-text="About Us"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 terminal-text max-w-3xl mx-auto text-lg"
            >
              We are MVJ College of Engineering's premier artificial intelligence research and development club,
              dedicated to pushing the boundaries of what's possible with AI.
            </motion.p>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg text-center hover-glow">
                  <div className="text-3xl font-bold glow-text mb-2">{stat.value}</div>
                  <div className="text-gray-400 terminal-text text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="relative group p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg" />
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6 glow-text">Our Mission</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-purple-500/10 rounded-lg mb-4">
                      <Brain className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                    <p className="text-gray-400 terminal-text">Pushing the boundaries of AI technology through innovative research and development</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-blue-500/10 rounded-lg mb-4">
                      <Users className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Community</h3>
                    <p className="text-gray-400 terminal-text">Building a vibrant community of AI enthusiasts and practitioners</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-cyan-500/10 rounded-lg mb-4">
                      <Rocket className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Growth</h3>
                    <p className="text-gray-400 terminal-text">Fostering personal and professional growth through hands-on experience</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-8 glow-text text-center">Our Achievements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                    <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
                      {achievement.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 terminal-text text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
