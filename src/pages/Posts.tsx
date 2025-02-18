import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import PostCard from '../components/PostCard';
import { db } from '../services/firebase';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

interface Post {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  platform: 'Instagram' | 'LinkedIn';
  link: string;
  designer: string;
  contentWriter: string;
  tags: string[];
  socialMedia: {
    instagram?: {
      link: string;
      designer: string;
      contentWriter: string;
    };
    linkedin?: {
      link: string;
      designer: string;
      contentWriter: string;
    };
  };
}

const Posts = () => {
  const { items: posts } = useFirestoreCollection<Post>(db, 'posts');
  console.log('Posts with tags:', posts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Get unique tags from all posts
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    tagSet.add('All');
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 glitch"
            data-text="Social Media Posts"
          >
            Social Media Posts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Latest updates from our social media channels
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg pl-12 pr-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedTag === tag
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-purple-500/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Posts; 