import React from 'react';
import { motion } from 'framer-motion';

interface ContentLoaderProps {
  type: 'event' | 'blog' | 'project';
}

const ContentLoader: React.FC<ContentLoaderProps> = ({ type }) => {
  const items = type === 'blog' ? Array(6).fill(null) : type === 'event' ? Array(4).fill(null) : Array(4).fill(null); // Adjust number of items based on type

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Title Skeleton */}
        <div className="text-center mb-12">
          <div className={`${type === 'blog' ? 'w-48' : type === 'event' ? 'w-64' : 'w-64'} h-12 bg-gray-800/50 rounded-lg mx-auto mb-4 overflow-hidden`}>
            <motion.div
              className="w-full h-full bg-gradient-to-r from-gray-800/0 via-gray-700/50 to-gray-800/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className={`grid gap-6 ${
          type === 'blog' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          type === 'event' ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
        }`}>
          {items.map((_, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-6 overflow-hidden">
              {/* Thumbnail Skeleton */}
              <div className={`${
                type === 'blog' ? 'h-48' :
                type === 'event' ? 'h-64' :
                'h-56'
              } bg-gray-700/50 rounded-lg mb-4 overflow-hidden`}>
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-gray-800/0 via-gray-700/50 to-gray-800/0"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'linear',
                  }}
                />
              </div>
              
              {/* Content Skeleton */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-700/50 rounded w-3/4 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-gray-800/0 via-gray-700/50 to-gray-800/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'linear',
                    }}
                  />
                </div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-gray-800/0 via-gray-700/50 to-gray-800/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentLoader;
