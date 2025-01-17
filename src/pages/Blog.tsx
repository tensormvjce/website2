import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogs, tags } from '../data/blogData';
import Layout from '../components/Layout';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter blogs based on search query and selected tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Reset visible posts when search query or tag changes
  React.useEffect(() => {
    setVisiblePosts(3);
  }, [searchQuery, selectedTag]);

  const [visiblePosts, setVisiblePosts] = useState(3);

  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, filteredBlogs.length));
  };

  const visibleBlogPosts = filteredBlogs.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredBlogs.length;

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="noise" />
        <div className="grid-background fixed inset-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center mb-12">
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

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 focus:border-purple-500/50 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-white 
                         placeholder-gray-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                    : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-purple-500/30 hover:text-purple-400'
                } border backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {visibleBlogPosts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => post.link && window.open(post.link, '_blank')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
                        }}
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
            </AnimatePresence>
          </div>

          {hasMorePosts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                         rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
