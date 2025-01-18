import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Users, Lightbulb, Code, Cpu, Bot, Sparkles, GraduationCap} from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useRef, useMemo, useState } from 'react';
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

function BlackHoleBackground() {
  const points = useRef<THREE.Points>(null!);
  const [isReady, setIsReady] = useState(false);
  const particleCount = 8000; 
  const sphere = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4 + 0.2;
      const spinAngle = Math.random() * Math.PI * 2;
      const branchAngle = ((i % 5) * 2 * Math.PI) / 5;
      const randomness = (Math.random() - 0.5) * 0.8;
      const curve = radius * 0.7;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomness;
      positions[i3 + 1] = Math.sin(branchAngle + spinAngle) * radius + randomness;
      positions[i3 + 2] = (Math.random() - 0.5) * curve;
    }
    setIsReady(true);
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.z += delta * 0.08;
      points.current.rotation.x = state.clock.elapsedTime * 0.04;
      points.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  if (!isReady) return null;

  return (
    <group scale={[1.5, 1.5, 1.5]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={true}>
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
  const { scrollYProgress } = useScroll();

  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [1, 1.3, 1.3, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [1, 0.9, 0.9, 1]
  );

  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 200, 200, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0, 0.5, -0.5, 0]
  );

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
      description: 'Be part of groundbreaking AI innovations and research projects.',
      color: 'from-cyan-500/10 to-purple-500/10'
    },
    {
      icon: <CustomIcons.SkillDevelopment />,
      title: 'Skill Development',
      description: 'Enhance your technical skills through hands-on workshops and training sessions.',
      color: 'from-purple-500/10 to-blue-500/10'
    }
  ];

  const features = [
    {
      icon: <CustomIcons.TechnicalWorkshops />,
      title: 'Technical Workshops',
      description: 'Regular workshops on AI/ML technologies, programming, and industry best practices.'
    },
    {
      icon: <CustomIcons.ProjectOpportunities />,
      title: 'Project Opportunities',
      description: 'Work on real-world AI projects and build a strong portfolio.'
    },
    {
      icon: <CustomIcons.IndustryExposure />,
      title: 'Industry Exposure',
      description: 'Interact with industry experts and gain insights into the AI industry.'
    },
    {
      icon: <CustomIcons.LearningResources />,
      title: 'Learning Resources',
      description: 'Access to curated learning materials, research papers, and industry reports.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white perspective-[1500px]">
      <motion.div 
        className="fixed inset-0 w-full h-screen will-change-transform"
        style={{ 
          scale,
          opacity,
          rotate,
          z: translateZ,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 3.5], fov: 65 }}
          dpr={1}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <BlackHoleBackground />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false}
              makeDefault
            />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div 
        className="relative z-10"
        style={{
          y: useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 0], { clamp: false })
        }}
      >
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6 tracking-wider glitch"
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
        </div>

        {/* Hero Section with Description */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-500/5 to-black/0" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <div className="text-5xl md:text-7xl font-bold mb-6 glitch"
                data-text="Tensor Club">
              Tensor Club
            </div>
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
          </div>
        </section>

        {/* Rest of the content */}
        <div className="relative z-10">
          {/* Benefits Section */}
          <section className="py-32">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Why Join Us?
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Be part of a community that's shaping the future of AI technology
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                      <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg w-fit">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 glow-text">{benefit.title}</h3>
                      <p className="text-gray-400 terminal-text">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 glow-text">What We Offer</h2>
                <p className="text-xl text-gray-400 terminal-text">
                  Comprehensive learning opportunities to boost your AI journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={feature.title} className="relative group">
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
                  </div>
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
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 glow-text">
                  Our Teams
                </h2>
                <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                  Specialized teams working together to push the boundaries of AI
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technical Team */}
                <div className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
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
                </div>

                {/* Content Team */}
                <div className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
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
                </div>

                {/* Media Team */}
                <div className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
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
                </div>

                {/* Design Team */}
                <div className="group relative rounded-3xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 px-8 py-10 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
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
                </div>
              </div>
            </div>
          </section>

          {/* Preview Members Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                {previewMembers.map((member) => (
                  <div key={member.id} className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                      }}
                    />
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-3">Discover the great minds behind Tensor.</h2>
              <Link to="/teams" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                Meet our team <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Events Preview Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div key={event.id} className="bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden 
                       hover:border-purple-500/40 transition-all duration-300 group">
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
                </div>
              ))}
            </div>
          </div>

          {/* Blogs Preview Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div key={blog.id} className="bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden 
                       hover:border-purple-500/40 transition-all duration-300 group">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
