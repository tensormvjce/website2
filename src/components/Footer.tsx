"use client";

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../logo_white.png";
import yusha from "../assets/team/yusha.jpg";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/company/tensor-club",
      color: "hover:text-blue-500"
    },
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/tensormvjce",
      color: "hover:text-gray-400"
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://instagram.com/tensor.mvjce",
      color: "hover:text-pink-500"
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
    { name: 'Posts', path: '/posts' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
  ];

  const teamMembers = [
    {
      image: "https://i.ibb.co/nqVQDw7J/my-img.jpg",
      alt: "Likit",
      linkedin: "https://www.linkedin.com/in/likithyadavgn"
    },
    {
      image: yusha,
      alt: "Yusha",
      linkedin: "https://www.linkedin.com/in/mohammad-yusha-718b26279"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-black/50 backdrop-blur-sm border-t border-purple-500/20"
    >
      {/* Top corner decorative elements */}
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden">
        <div className="absolute left-0 top-0 w-16 h-16 bg-black/50 rounded-br-3xl" />
        <div className="absolute right-0 top-0 w-16 h-16 bg-black/50 rounded-bl-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Logo & Contact Section */}
          <div className="space-y-6">
            <motion.div 
              className="flex items-center space-x-4 bg-black/30 p-3 rounded-lg backdrop-blur-sm border border-purple-500/10"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} className="w-16 h-16" alt="Tensor Logo" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white tracking-wide">TENSOR CLUB</h2>
                <p className="text-sm text-gray-300">MVJ College of Engineering</p>
              </div>
            </motion.div>
            <div className="space-y-2 text-gray-300">
              <p className="text-sm">Near ITPB, Channasandra, Bangalore - 560067</p>
              <motion.a
                href="mailto:tensormvjce@gmail.com"
                className="inline-block text-sm text-purple-400 hover:text-purple-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                tensormvjce@gmail.com
              </motion.a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-gray-300">
                Follow us on social media to stay updated with our latest events and announcements.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors ${link.color} bg-white/5 p-2 rounded-lg backdrop-blur-sm`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Developers Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Developers</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Meet the talented developers behind this website
              </p>
              <div className="flex -space-x-4">
                {teamMembers.map((member, index) => (
                  <motion.a
                    key={index}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                    whileHover={{ scale: 1.1, zIndex: 1 }}
                  >
                    <img
                      src={member.image}
                      alt={member.alt}
                      className="w-14 h-14 rounded-full border-2 border-purple-500/50 hover:border-purple-500 transition-colors"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Tensor Club. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <motion.a 
                href="#" 
                className="hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <span>•</span>
              <motion.a 
                href="#" 
                className="hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none" />
    </motion.footer>
  );
};

export default Footer;
