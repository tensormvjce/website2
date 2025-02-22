import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreItem } from '../hooks/useFirestoreCollection';
import ReactMarkdown from 'react-markdown';

interface BlogPost extends FirestoreItem {
  title: string;
  description: string;
  content: string;
  date: string;
  image: string;
  bannerImg: string;
  contentWriter: string;
  writerAvatar: string;
  tags?: string[];
}

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) return;
        
        // Get document directly using the ID
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const blogData = docSnap.data() as Omit<BlogPost, 'id'>;
          const blog: BlogPost = {
            id: docSnap.id,
            title: blogData.title,
            description: blogData.description,
            content: blogData.content,
            date: blogData.date,
            image: blogData.image,
            bannerImg: blogData.bannerImg,
            contentWriter: blogData.contentWriter,
            writerAvatar: blogData.writerAvatar,
            tags: blogData.tags
          };
          setBlog(blog);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog details');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading blog details...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <button
            onClick={() => navigate('/blogs')}
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-24 pb-16">
      {/* Background Elements */}
      <div className="noise" />
      <div className="grid-background fixed inset-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Blog Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4 text-center"
        >
          {blog.title}
        </motion.h1>

        {/* Author and Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <div className="flex items-center space-x-2">
            <img
              src={blog.writerAvatar}
              alt={blog.contentWriter}
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.contentWriter}`;
              }}
            />
            <span className="text-purple-400">{blog.contentWriter}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-purple-400">{blog.date}</span>
        </motion.div>

        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 relative rounded-2xl overflow-hidden"
        >
          <img
            src={blog.bannerImg || blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = './blogs/placeholder.webp';
              target.onerror = null;
            }}
          />
        </motion.div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <ReactMarkdown>
            {blog.content}
          </ReactMarkdown>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Blogs
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetails; 