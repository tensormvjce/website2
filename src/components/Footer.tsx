"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaReact } from 'react-icons/fa';
import { SiTensorflow } from 'react-icons/si';
import logo from "../logo_white.png";
import likith from "../assets/team/likith1.png";
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
          <div className="flex flex-col justify-center items-center self-center">
            {/* Social Media */}
            <div className="text-center space-y-4">
              <p className="text-gray-300 font-medium">Follow us on Social Media</p>
              <div className="flex space-x-6 justify-center">
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
          <div className="flex flex-col items-center justify-center self-center">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-gray-300 font-medium text-lg">Developed by</span>
              <div className="flex -space-x-6">
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
                      className="w-16 h-16 rounded-full border-2 border-purple-500/50 hover:border-purple-500 transition-colors"
                    />
                  </motion.a>
                ))}
              </div>
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
