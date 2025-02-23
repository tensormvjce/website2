import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FirestoreItem } from '../hooks/useFirestoreCollection';
import ReactMarkdown from 'react-markdown';

interface ItemCardProps extends FirestoreItem {
  type: 'blog' | 'project' | 'event';
  loading?: boolean;
  status?: 'Open' | 'Closed' | 'Ended';
  author?: string;
  link?: string;
  contentWriter?: string; // Added for LinkedIn link
  contentWriterLinkedIn?: string; // Added for LinkedIn URL
  designer?: string; // Added for LinkedIn link
  designerLinkedIn?: string; // Added for LinkedIn URL
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  title, 
  description, 
  date, 
  image, 
  tags = [], 
  type,
  status,
  author,
  link,
  loading = false,
  contentWriter,
  contentWriterLinkedIn,
  designer,
  designerLinkedIn,
}) => {
  // Format date with type safety
  const formattedDate = useMemo(() => {
    if (!date) {
      return '';
    }
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  }, [date]);

  // Debugging logs to check props
  useEffect(() => {
    console.log('ItemCard Props:', {
      title: title || 'No title provided',
      description: description || 'No description provided',
      date: date || 'No date provided',
      image: image || 'No image provided',
      tags: tags || 'No tags provided',
      type,
      status: status || 'No status provided',
      author: author || 'No author provided',
      link: link || 'No link provided',
      contentWriter: contentWriter || 'No content writer provided',
      contentWriterLinkedIn: contentWriterLinkedIn ? `Valid: ${contentWriterLinkedIn}` : 'No content writer LinkedIn provided',
      designer: designer || 'No designer provided',
      designerLinkedIn: designerLinkedIn ? `Valid: ${designerLinkedIn}` : 'No designer LinkedIn provided'
    });
  }, [title, description, date, image, tags, type, status, author, link, contentWriter, contentWriterLinkedIn, designer, designerLinkedIn]);

  // Validate and format LinkedIn URLs
  const validateAndFormatLink = (url: string | undefined): string => {
    if (!url || url.trim() === '') {
      console.warn('LinkedIn URL is missing or empty, defaulting to #:', url);
      return '#';
    }
    try {
      const trimmedUrl = url.trim();
      const urlObj = new URL(trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`);
      if (urlObj.hostname !== 'www.linkedin.com' && urlObj.hostname !== 'linkedin.com') {
        console.warn('Invalid LinkedIn URL detected, defaulting to #. Expected linkedin.com, got:', urlObj.hostname);
        return '#';
      }
      return trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;
    } catch (error) {
      console.error('Invalid URL format, defaulting to #:', url, error);
      return '#';
    }
  };

  if (loading) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          {/* Image Skeleton */}
          <div className="aspect-video bg-gray-800/50 overflow-hidden">
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
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-800/50 rounded w-3/4 overflow-hidden">
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
            <div className="space-y-2">
              <div className="h-4 bg-gray-800/50 rounded w-full overflow-hidden">
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
              <div className="h-4 bg-gray-800/50 rounded w-2/3 overflow-hidden">
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
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <a href={link} className="block">
        <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300">
          {image && (
            <div className="aspect-video">
              <img
                src={image}
                alt={title || 'Item image'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              {type === 'project' && status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'Open' ? 'bg-green-500/20 text-green-300' :
                  status === 'Closed' ? 'bg-red-500/20 text-red-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {status}
                </span>
              )}
            </div>
            <div className="space-y-2 mb-4">
              {type === 'project' && author && (
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">{author}</span>
                  {formattedDate && (
                    <span className="mx-2 text-gray-600">•</span>
                  )}
                  {formattedDate && (
                    <span className="text-gray-400 text-sm">{formattedDate}</span>
                  )}
                </div>
              )}
              {/* Designer and Content Writer Links */}
              {(designer || designerLinkedIn) && (
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">Designer: </span>
                  <a 
                    href={validateAndFormatLink(designerLinkedIn)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 text-sm ml-1 hover:text-purple-300 transition-colors"
                  >
                    {designer || 'Unknown Designer'}
                  </a>
                </div>
              )}
              {(contentWriter || contentWriterLinkedIn) && (
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">Content Writer: </span>
                  <a 
                    href={validateAndFormatLink(contentWriterLinkedIn)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 text-sm ml-1 hover:text-purple-300 transition-colors"
                  >
                    {contentWriter || 'Unknown Writer'}
                  </a>
                </div>
              )}
            </div>
            <div className="text-gray-400 mb-4">
              <ReactMarkdown className="prose prose-invert max-w-none">
                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
              </ReactMarkdown>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center">
              {type !== 'blog' && (
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>
              )}
              <span className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                {type === 'event' ? 'Learn more' : 'Read more'} →
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ItemCard;