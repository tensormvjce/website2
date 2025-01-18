import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';

interface Stat {
  number: string;
  title: string;
  description: string;
}

const stats: Stat[] = [
  {
    number: "100+",
    title: "Active Members",
    description: "Passionate students working on AI projects"
  },
  {
    number: "20+",
    title: "Projects Completed",
    description: "Innovative AI solutions developed"
  },
  {
    number: "30+",
    title: "Events Organized",
    description: "Workshops, hackathons, and tech talks"
  },
  {
    number: "10+",
    title: "Industry Partners",
    description: "Collaborating with leading tech companies"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
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
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Empowering the next generation of AI innovators
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4 glow-text">Our Mission</h2>
            <p className="text-gray-400 terminal-text">
              At Tensor Club, we are dedicated to fostering innovation and excellence in artificial intelligence. 
              Our mission is to create a collaborative environment where students can learn, experiment, and build 
              cutting-edge AI solutions while developing practical skills for the future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4 glow-text">Our Vision</h2>
            <p className="text-gray-400 terminal-text">
              We envision becoming a leading student-led AI research community, bridging the gap between academic 
              knowledge and industry applications. Through hands-on projects, workshops, and industry collaborations, 
              we aim to prepare our members for the AI-driven future.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-2">{stat.title}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <Workflow className="w-12 h-12 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 glow-text">Join Our Community</h2>
          <p className="text-gray-400 terminal-text mb-8">
            Whether you're a beginner or an experienced developer, Tensor Club welcomes all who are passionate 
            about AI and technology. Join us to be part of an exciting journey into the future of artificial intelligence.
          </p>
          <motion.a
            href="/join"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                     rounded-lg text-white font-medium transition-all duration-300"
          >
            Join Tensor Club
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
