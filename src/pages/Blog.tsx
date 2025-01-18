import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../services/firebase';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';

const Blog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleBlogs, setVisibleBlogs] = useState<number>(4);

  // Fetch blogs from Firestore
  const { items: blogs, loading, error } = useFirestoreCollection(db, 'blogs');

  // Extract unique tags from blogs
  const tags = ["All", ...new Set(blogs.flatMap(blog => blog.tags))];

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleLoadMore = () => {
    setVisibleBlogs(prev => Math.min(prev + 4, filteredBlogs.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error loading blogs: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 glitch"
          data-text="Tech Insights & Stories"
        >
          Tech Insights & Stories
        </motion.h1>

        {/* AI Journey Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 terminal-text md-space-y-2 text-center mb-12"
        >
          Exploring the Frontiers of Technology
        </motion.h2>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleBlogs(4);
            }}
          />
        </div>

        {/* Tags */}
        <div className="mb-12 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setVisibleBlogs(4);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedTag === tag 
                  ? 'bg-purple-500/40 border-purple-500' 
                  : 'bg-gray-800/40 border-gray-700 hover:border-purple-500/50'} 
                border`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              >
                {/* Blog Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                  <img
                    src={blog.image || './blogs/placeholder.webp'}
                    alt={blog.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = './blogs/placeholder.webp';
                      target.onerror = null;
                    }}
                  />
                </div>
                
                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 rounded-md text-xs font-medium text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-purple-400 mb-3">{blog.date}</p>
                  <p className="text-gray-400 text-sm">{blog.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                       rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Load More Blogs
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
