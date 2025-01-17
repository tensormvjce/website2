"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaReact } from 'react-icons/fa';
import { SiTensorflow } from 'react-icons/si';
import logo from "../logo_white.png";
import likith from "../assets/team/likith.png";
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
      href: "https://www.instagram.com/tensor.mvjce",
      color: "hover:text-pink-500"
    }
  ];

  const teamMembers = [
    {
      image: likith,
      alt: "Likit",
      linkedin: "https://www.linkedin.com/in/likithyadavgn"
    },
    {
      image: yusha,
      alt: "Yusha",
      linkedin: "https://www.linkedin.com/in/mohammad-yusha-718b26279"
    }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-black/50 backdrop-blur-sm border-t border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  md:gap-12 items-start">
          {/* Left Section */}
          <div className="space-y-6">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} className="w-20 h-20" alt="Tensor Logo" />
            </motion.div>
            <div className="space-y-2 text-gray-300">
              <p className="font-medium">MVJ College of Engineering</p>
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

          {/* Center Section */}
          <div className="flex flex-col justify-center space-y-10 md:space-x-12  items-center">
            {/* Social Media */}
            <div className="text-center space-y-4 md:space-y-12">
              <p className="text-gray-300 font-medium">Follow us on Social Media</p>
              <div className="flex space-x-6 justify-center md:space-x-12">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors ${link.color}`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center md:items-end justify-center space-y-6 md:space-y-12 mr-10">
            <div className="flex items-center space-x-4 text-base">
              <div className="flex items-center space-x-2 text-gray-300 font-medium md:text-lg md:space-x-4 ">
                <span>Made with</span>
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    color: ['#ef4444', '#ec4899', '#ef4444'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-lg"
                >
                  ❤️
                </motion.span>
                <span>by</span>
              </div>
            </div>
            <div className="flex -space-x-4">
              {teamMembers.map((member, index) => (
                <motion.a
                  key={index}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-0.5 shadow-lg transition-transform"
                    whileHover={{ scale: 1.1, zIndex: 1 }}
                  >
                    <img 
                      src={member.image}
                      alt={member.alt}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FaLinkedin className="w-6 h-6 text-blue-400" />
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
    </motion.footer>
  );
};

export default Footer;
