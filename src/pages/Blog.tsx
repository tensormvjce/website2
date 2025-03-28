import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CARD_CLASSES,
  CARD_INNER_CLASSES,
  CARD_IMAGE_CLASSES,
  CARD_IMAGE_INNER_CLASSES,
  CARD_CONTENT_CLASSES,
  CARD_TAGS_CLASSES,
  CARD_TAG_CLASSES,
  CARD_TITLE_CLASSES,
  CARD_DESCRIPTION_CLASSES,
  CARD_FOOTER_CLASSES
} from '../styles/cardStyles';

interface BlogPost {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
  content: string;
  author: string;
}

const Blog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleBlogs, setVisibleBlogs] = useState<number>(4);

  // Fetch blogs from Firestore
  const { items: blogs, loading, error } = useFirestoreCollection<BlogPost>(db, 'blogs');

  // Extract unique tags from blogs with type safety
  const tags = useMemo(() => {
    const allTags = blogs.reduce<string[]>((acc, blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        acc.push(...blog.tags);
      }
      return acc;
    }, []);
    
    return ["All", ...new Set(allTags)];
  }, [blogs]);

  // Filter blogs based on search and tag with type safety
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const blogTags = blog.tags || [];
      const matchesTag = selectedTag === "All" || blogTags.includes(selectedTag);
      const matchesSearch = 
        (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTag, searchQuery]);

  const handleLoadMore = () => {
    setVisibleBlogs(prev => Math.min(prev + 4, filteredBlogs.length));
  };

  const handleTagClick = (tag: string): void => {
    setSelectedTag(tag);
    setVisibleBlogs(4);
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
    <div className="blog-bg">
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              onClick={() => handleTagClick(tag)}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
              <motion.div
                key={blog.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link to={`/blog/${blog.id}`}>
                  <div className={CARD_CLASSES}>
                    <div className={CARD_INNER_CLASSES}>
                      <div className={CARD_IMAGE_CLASSES}>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className={CARD_IMAGE_INNER_CLASSES}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
                          }}
                        />
                      </div>
                      <div className={CARD_CONTENT_CLASSES}>
                        <h3 className={CARD_TITLE_CLASSES}>{blog.title}</h3>
                        <p className="text-sm text-purple-400 mb-3 flex-shrink-0">by {blog.author}</p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className={CARD_TAGS_CLASSES}>
                            {blog.tags.map((tag, idx) => (
                              <span key={idx} className={CARD_TAG_CLASSES}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className={CARD_DESCRIPTION_CLASSES}>{blog.description}</div>
                        <div className={CARD_FOOTER_CLASSES}>
                          <div className="flex items-center text-sm text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-purple-500/20 text-purple-300 px-6 py-3 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Blog;
