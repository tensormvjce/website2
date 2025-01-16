import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of AI in 2025',
      excerpt: 'Exploring the latest breakthroughs in artificial intelligence and their impact on society.',
      date: '2025-01-15',
      readTime: '5 min read',
      image: '/blog/ai-future.jpg',
      category: 'AI Research'
    },
    {
      title: 'Machine Learning Best Practices',
      excerpt: 'A comprehensive guide to implementing machine learning models effectively.',
      date: '2025-01-10',
      readTime: '8 min read',
      image: '/blog/ml-practices.jpg',
      category: 'Machine Learning'
    },
    {
      title: 'Neural Networks Explained',
      excerpt: 'Understanding the fundamentals of neural networks and deep learning.',
      date: '2025-01-05',
      readTime: '6 min read',
      image: '/blog/neural-networks.jpg',
      category: 'Deep Learning'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 glitch"
            data-text="Latest Insights"
          >
            Latest Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Exploring the frontiers of artificial intelligence and machine learning
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-xs text-purple-400 terminal-text px-2 py-1 rounded-full border border-purple-400/30">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 glow-text group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 terminal-text text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 border border-purple-500/50 hover:border-purple-500 rounded hover-glow terminal-text transition-colors">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;