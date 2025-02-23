import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, MessageSquare } from 'lucide-react';
import LockedButton from '../components/LockedButton';

const ProcessStep = ({ 
  icon: Icon, 
  title, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  delay: number; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative"
  >
    {/* Neural connection line */}
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: delay + 0.2, duration: 0.5 }}
      className="absolute left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-purple-500/50 to-transparent
                 top-full hidden sm:block"
    />
    
    {/* Step content */}
    <div className="relative z-10 w-48 aspect-square rounded-xl bg-black/50 backdrop-blur-sm 
                  border border-purple-500/30 p-6 flex flex-col items-center justify-center
                  group hover:border-purple-500/50 transition-all duration-300">
      {/* Neuron glow effect */}
      <div className="absolute inset-0 bg-purple-500/5 rounded-xl filter blur-xl 
                    group-hover:bg-purple-500/10 transition-all duration-300" />
      
      {/* Icon with pulse effect */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 bg-purple-500/20 rounded-full filter blur-md"
        />
        <Icon className="w-12 h-12 text-purple-400 relative z-10" />
      </div>
      
      <h3 className="mt-4 text-lg font-semibold text-center text-white/90">{title}</h3>
    </div>
  </motion.div>
);

const Registrations = () => {
  return (
    <div className="registration-bg">
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glitch"
              data-text="Join our amazing Club">
            Join our amazing Club
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto terminal-text">
            Passionate about tech, innovation, and community? Be part of an energetic team.
          </p>
        </motion.div>


        {/* Application Process */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-center mb-16"
          >
            Application Process
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 sm:gap-16">
            <ProcessStep
              icon={FileText}
              title="Fill the form"
              delay={0.4}
            />
            <ProcessStep
              icon={Users}
              title="Complete the tasks"
              delay={0.6}
            />
            <ProcessStep
              icon={MessageSquare}
              title="Take the interview"
              delay={0.8}
            />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What are you waiting for?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 terminal-text">
            If you're excited to learn, collaborate, and push boundaries, don't wait. 
            Apply now and embark on a journey of growth and possibilities!
          </p>
          
          <LockedButton 
            text="Apply Now"
            className="mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Registrations;
