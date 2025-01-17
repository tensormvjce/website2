import { motion } from 'framer-motion';
import { Brain, Users, Lightbulb, Code, Cpu, Bot, Sparkles, GraduationCap} from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import LockedButton from '../components/LockedButton';
import { events } from '../data/eventsData';
import { blogs } from '../data/blogData';
import { previewMembers } from '../data/previewTeamData';
import { scrollToTop } from '../utils/scrollUtils';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import HeroText from '../components/HeroText';
import Layout from '../components/Layout';

function BlackHoleBackground() {
  const points = useRef<THREE.Points>(null!);
  const particleCount = 12000;
  const sphere = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 4 + 0.2;
    const spinAngle = Math.random() * Math.PI * 2;
    const branchAngle = ((i % 5) * 2 * Math.PI) / 5;
    
    const randomness = (Math.random() - 0.5) * 0.8;
    const curve = radius * 0.7;
    
    sphere[i3] = Math.cos(branchAngle + spinAngle) * radius + randomness;
    sphere[i3 + 1] = Math.sin(branchAngle + spinAngle) * radius + randomness;
    sphere[i3 + 2] = (Math.random() - 0.5) * curve;
  }

  useFrame((state, delta) => {
    points.current.rotation.z += delta * 0.08;
    points.current.rotation.x = state.clock.elapsedTime * 0.04;
    points.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group scale={[1.5, 1.5, 1.5]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4444ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}


const Home = () => {
  // Custom SVG Icons
  const CustomIcons = {
    Projects: () => (
      <Brain className="w-8 h-8 text-purple-400" />
    ),
    Networking: () => (
      <Users className="w-8 h-8 text-blue-400" />
    ),
    Innovation: () => (
      <Lightbulb className="w-8 h-8 text-cyan-400" />
    ),
    SkillDevelopment: () => (
      <Code className="w-8 h-8 text-purple-400" />
    ),
    TechnicalWorkshops: () => (
      <Cpu className="w-8 h-8 text-blue-400" />
    ),
    ProjectOpportunities: () => (
      <Bot className="w-8 h-8 text-purple-400" />
    ),
    IndustryExposure: () => (
      <Sparkles className="w-8 h-8 text-cyan-400" />
    ),
    LearningResources: () => (
      <GraduationCap className="w-8 h-8 text-purple-400" />
    )
  };

  const benefits = [
    {
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      title: 'AI/ML Projects',
      description: 'Work on real-world AI projects and gain hands-on experience with cutting-edge technologies.',
      color: 'from-purple-500/10 to-blue-500/10'
    },
    {
      icon: <CustomIcons.Networking />,
      title: 'Networking',
      description: 'Connect with like-minded peers, industry experts, and build lasting professional relationships.',
      color: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: <CustomIcons.Innovation />,
      title: 'Innovation',
      description: 'Turn your ideas into reality with our supportive environment and mentorship programs.',
      color: 'from-cyan-500/10 to-purple-500/10'
    },
    {
      icon: <CustomIcons.SkillDevelopment />,
      title: 'Skill Development',
      description: 'Master the latest tools and frameworks through workshops, hackathons, and coding challenges.',
      color: 'from-purple-500/10 to-blue-500/10'
    }
  ];

  const features = [
    {
      icon: <CustomIcons.TechnicalWorkshops />,
      title: 'Technical Workshops',
      description: 'Regular hands-on sessions on AI, ML, Deep Learning, and emerging technologies.'
    },
    {
      icon: <CustomIcons.ProjectOpportunities />,
      title: 'Project Opportunities',
      description: 'Collaborate on club projects and participate in prestigious AI competitions.'
    },
    {
      icon: <CustomIcons.IndustryExposure />,
      title: 'Industry Exposure',
      description: 'Interact with industry professionals and gain insights into real-world AI applications.'
    },
    {
      icon: <CustomIcons.LearningResources />,
      title: 'Learning Resources',
      description: 'Access to curated learning paths, research papers, and exclusive study materials.'
    }
  ];

  return (
    <Layout>
    <div className="relative min-h-screen bg-transparent text-white">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="relative h-screen w-full overflow-hidden">
          <div className="w-full h-screen relative">
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: '#000000' }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <BlackHoleBackground />
                  <HeroText />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl font-bold text-white text-center mb-6 tracking-wider glitch"
            data-text="WELCOME TO"
          >
            WELCOME TO
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative"
          >
            <h1 
              className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-white tracking-tight glitch"
              data-text="TENSOR CLUB"
            >
              TENSOR CLUB
            </h1>
            <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-blue-400/30 to-purple-600/30 -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm tracking-widest uppercase">Scroll to Explore</span>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch"
                data-text="Tensor Club">
              Tensor Club
            </h1>
            <p className="text-2xl text-gray-400 mb-8 terminal-text">
              MVJ College of Engineering's Premier AI Community
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto terminal-text">
              Empowering students to explore, innovate, and excel in the world of Artificial Intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <LockedButton 
                text="Join Our Club"
              />
              <Link to="/blog" onClick={scrollToTop}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black/50 border border-gray-700 hover:border-purple-500/50 
                           rounded-lg font-semibold text-lg hover-glow terminal-text"
                >
                  Explore Projects
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <Spline scene="https://prod.spline.design/o4jeqXJWvhK5qYQx/scene.splinecode" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32">
        {/* Semi-transparent overlay to keep particles visible */}
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Why Join Us?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Be part of a community that's shaping the future of AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                  <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg w-fit">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 glow-text">{benefit.title}</h3>
                  <p className="text-gray-400 terminal-text">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 glow-text">What We Offer</h2>
            <p className="text-xl text-gray-400 terminal-text">
              Comprehensive learning opportunities to boost your AI journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 glow-text">{feature.title}</h3>
                      <p className="text-gray-400 terminal-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute -top-1/3 left-2/3 -z-10 transform-gpu blur-3xl xl:left-1/2" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-purple-500 to-blue-500 opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 glow-text">
              Our Teams
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Specialized teams working together to push the boundaries of AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Team */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-3xl transition duration-300 group-hover:bg-purple-500/10" />
              <div className="relative">
                <h3 className="text-xl font-semibold leading-7 text-gradient-purple mb-3 text-4xl font-bold mb-4 glow-text">Technical Team</h3>
                <p className="text-base leading-7 text-gray-400 mb-6">
                  Developing cutting-edge AI/ML solutions and conducting research in emerging technologies.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Neural Networks</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Computer Vision</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Natural Language Processing</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Content Team */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-3xl transition duration-300 group-hover:bg-purple-500/10" />
              <div className="relative">
                <h3 className="text-xl font-semibold leading-7 text-gradient-purple mb-3 text-4xl font-bold mb-4 glow-text">Content Team</h3>
                <p className="text-base leading-7 text-gray-400 mb-6">
                  Creating informative and engaging content about AI/ML concepts and latest developments.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Technical Blogs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Social Media</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Documentation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Media Team */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-3xl transition duration-300 group-hover:bg-purple-500/10" />
              <div className="relative">
                <h3 className="text-xl font-semibold leading-7 text-gradient-purple mb-3 text-4xl font-bold mb-4 glow-text">Media Team</h3>
                <p className="text-base leading-7 text-gray-400 mb-6">
                  Capturing and showcasing our journey through various media formats.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Event Coverage</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Video Production</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Photography</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Design Team */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-3xl transition duration-300 group-hover:bg-purple-500/10" />
              <div className="relative">
                <h3 className="text-xl font-semibold leading-7 text-gradient-purple mb-3 text-4xl font-bold mb-4 glow-text">Design Team</h3>
                <p className="text-base leading-7 text-gray-400 mb-6">
                  Creating visually appealing designs and maintaining brand consistency.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">UI/UX Design</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Graphics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-px flex-auto bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0" />
                    <span className="text-sm font-medium">Branding</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center gap-4 mb-6">
            {previewMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: member.id * 0.1 }}
                className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 
                         hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                  }}
                />
              </motion.div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-3">Discover the great minds behind Tensor.</h2>
          <Link to="/teams" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            Meet our team <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Events Preview Section */}
      <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold mb-4 glow-text">Our Events</h2>
            <Link to="/events" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              Explore more events <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden 
                         hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-purple-400/80 mb-4 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 terminal-text group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  <div className="mt-4">
                    <Link 
                      to={`/events/${event.slug}`}
                      onClick={scrollToTop}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Learn more <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Blogs Preview Section */}
      <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold mb-4 glow-text">Our Blogs</h2>
            <Link to="/blog" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              Explore more blogs <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden 
                         hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 terminal-text group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{blog.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
    </div>
    </Layout>
  );
};

export default Home;
