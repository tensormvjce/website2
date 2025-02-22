import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../services/firebase';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import ItemCard from '../components/ItemCard';

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
  author: string;
  tags?: string[];
}

const Blogs: React.FC = () => {
  const { items: blogs, loading, error } = useFirestoreCollection<Blog>(db, 'blogs');

  console.log('Blogs State:', { blogs, loading, error });
  console.log('Blog dates:', blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    date: blog.date,
    dateType: typeof blog.date
  })));

  blogs.forEach(blog => {
    console.log('Blog details:', {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      date: blog.date,
      dateType: typeof blog.date,
      allFields: { ...blog }
    });
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
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
              data-text="Blogs"
            >
              Blogs
            </motion.h1>
            <motion.div className="h-4 w-48 bg-gray-800/50 mx-auto rounded overflow-hidden">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-gray-800/0 via-gray-700/50 to-gray-800/0"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="bg-gray-800/50 rounded-lg p-6 overflow-hidden">
                  <div className="h-48 bg-gray-700/50 rounded-lg mb-4 overflow-hidden">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="noise" />
        <div className="grid-background fixed inset-0" />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-lg"
          >
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 0px rgb(239 68 68 / 0.2)", "0 0 20px rgb(239 68 68 / 0.2)", "0 0 0px rgb(239 68 68 / 0.2)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 rounded-full border-2 border-red-500/50 mx-auto mb-4"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
            data-text="Blogs"
          >
            Blogs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Explore our latest insights and stories
          </motion.p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {blogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur" />
              <div className="relative p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl">
                <motion.div 
                  animate={{ 
                    boxShadow: ["0 0 0px rgb(168 85 247 / 0.2)", "0 0 20px rgb(168 85 247 / 0.2)", "0 0 0px rgb(168 85 247 / 0.2)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-purple-500/50"
                />
                <p className="text-gray-400 text-center">No blogs found</p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ItemCard
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    date={blog.date}
                    tags={blog.tags}
                    author={blog.author}
                    link={`/blog/${blog.id}`}
                    type="blog"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blogs;
