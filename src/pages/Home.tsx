import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Users, Lightbulb, Code, Cpu, Bot, Sparkles, GraduationCap} from 'lucide-react';
import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import LockedButton from '../components/LockedButton';
import ItemCard from '../components/ItemCard';
import TeamSection from '../components/TeamSection';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';
import { scrollToTop } from '../utils/scrollUtils';
import { previewMembers } from '../data/previewTeamData';
import PostCard from '../components/PostCard';
import Spline from '@splinetool/react-spline';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  status: 'Open' | 'Closed' | 'Ended';
  slug: string;
  tags: string[];
  location: string;
  registrationLink?: string;
  venue?: string;
  duration?: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author: string;
}

interface Post {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  designer: string;
  contentWriter: string;
  tags: string[];
  socialMedia: {
    instagram?: { link: string };
    linkedin?: { link: string };
  };
}

function BlackHoleBackground() {
  const points = useRef<THREE.Points>(null!);
  const [isReady, setIsReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const particleCount = 8000; 

  // Create zoom effect based on scroll
  const zoomScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 2.5]  // Zoom from normal (1) to 2.5x as we scroll
  );

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
      // Update scale based on scroll progress
      const currentScale = zoomScale.get();
      points.current.scale.set(currentScale, currentScale, currentScale);
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

  // Remove previous transform effects that were affecting content
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [1, 0.9, 0.9, 1]
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
      description: 'Be part of groundbreaking AI innovations, research projects and create new ideas.',
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

  const { items: events = [] } = useFirestoreCollection<Event>(db, 'events');
  const { items: blogs = [] } = useFirestoreCollection<Blog>(db, 'blogs');
  const { items: posts } = useFirestoreCollection<Post>(db, 'posts');

  // Add this sorting logic before the return statement
  const sortedEvents = events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 w-full h-screen">
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
      </div>

      <motion.div 
        className="relative z-10"
        style={{
          opacity
        }}
      >
        {/* Hero Section */}
        <div className="relative h-[100vh] md:h-screen flex items-center justify-center md:justify-start">
          {/* Content - Centered on mobile, Left on desktop */}
          <div className="relative z-8 w-full md:w-1/2 px-4 md:pl-26 flex flex-col justify-center py-10 md:py-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-wider glitch cyberpunk-glow text-center"
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
              <h1 className="text-6xl sm:text-8xl md:text-8xl font-extrabold mb-4 tracking-wider glitch cyberpunk-glow text-center md:text-center" data-text="TENSOR CLUB">
                TENSOR CLUB
              </h1>
            </motion.div>
          </div>

          {/* Spline Background - Desktop Only */}
          <div className="hidden md:block absolute right-0 w-1/2 h-full">
            <div className="absolute inset-0 flex items-center justify-end">
              <Spline 
                scene="https://prod.spline.design/Hmu6ozdYkBhVaL0o/scene.splinecode"
                className="w-full h-full transform-gpu scale-90"
              />
              <div className="absolute bottom-12 right-12 z-20 p-8 bg-black rounded-tl-lg">
                <div className="text-xs text-black font-mono">
                  Tensor Club
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Description */}
        <section className="relative min-h-screen flex items-center justify-center">
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
              <Link to="/projects" onClick={scrollToTop}>
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
                <h2 className="section-heading text-4xl md:text-5xl mb-4">
                  Why Join Us?
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Be part of a community that's shaping the future of AI technology
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={`benefit-${index}`} className="relative group">
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
          <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-16">
                <h2 className="section-heading text-4xl mb-4">What We Offer</h2>
                <p className="text-xl text-gray-400 terminal-text">
                  Comprehensive learning opportunities to boost your AI journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={`feature-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
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
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
            <div className="absolute inset-0 bg-noise opacity-20" />
            
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="section-heading text-4xl">Our Team Structure</h2>
                <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                  Specialized teams working together to push the boundaries of AI
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                {/* Technical Team */}
                <TeamSection
                  title="Technical Team"
                  description="Developing cutting-edge AI/ML solutions and conducting research in emerging technologies."
                  items={[
                    "Neural Networks",
                    "Computer Vision",
                    "Natural Language Processing"
                  ]}
                />

                {/* Content Team */}
                <TeamSection
                  title="Content Team"
                  description="Creating informative and engaging content about AI/ML concepts and latest developments."
                  items={[
                    "Technical Blogs",
                    "Social Media",
                    "Documentation"
                  ]}
                />

                {/* Media Team */}
                <TeamSection
                  title="Media Team"
                  description="Capturing and showcasing our journey through various media formats."
                  items={[
                    "Event Coverage",
                    "Video Production",
                    "Photography"
                  ]}
                />

                {/* Design Team */}
                <TeamSection
                  title="Design Team"
                  description="Creating visually appealing designs and maintaining brand consistency."
                  items={[
                    "UI/UX Design",
                    "Graphics",
                    "Branding"
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Preview Members Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                {previewMembers.map((member, index) => (
                  <div key={`member-${index}`} className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
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
              <h2 className="section-heading text-4xl">Our Events</h2>
              <Link to="/events" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                Explore more events <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.slice(0, 3).map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300">
                    <Link to={`/events/${event.slug}`} onClick={scrollToTop}>
                      <div className="aspect-video">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'Open' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : event.status === 'Ended' 
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {event.status === 'Open' ? 'Registration Open' : 
                             event.status === 'Ended' ? 'Event Ended' : 
                             'Registration Closed'}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-purple-400 px-2 py-1 rounded-full border border-purple-400/30 terminal-text"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="text-purple-400">{event.date}</span>
                          </div>
                          {event.registrationLink && event.status === 'Open' && (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                                       rounded-lg text-white font-medium transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Register
                            </a>
                          )}
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2 group transition-all duration-300">
                            Read More
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M13 7l5 5m0 0l-5 5m5-5H6" 
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blogs Preview Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="section-heading text-4xl">Our Blogs</h2>
              <Link to="/blogs" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                Explore more blogs <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBlogs.slice(0, 3).map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.id}`} onClick={scrollToTop}>
                  <ItemCard {...blog} type="blog" />
                </Link>
              ))}
            </div>
          </div>

          {/* Posts Preview Section */}
          <div className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="section-heading text-4xl">Our Posts</h2>
              <Link to="/posts" onClick={scrollToTop} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                Explore more posts <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.slice(0, 3).map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300">
                    <PostCard
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      image={post.image}
                      tags={post.tags || []}
                      designer={post.designer}
                      contentWriter={post.contentWriter}
                      socialMedia={post.socialMedia}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
