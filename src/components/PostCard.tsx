import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
  designer?: string; // Made optional
  designerLinkedIn?: string; // Made optional
  contentWriter?: string; // Made optional
  contentWriterLinkedIn?: string; // Made optional
  socialMedia: {
    instagram?: {
      link: string;
    };
    linkedin?: {
      link: string;
    };
  };
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  date,
  image,
  tags = [],
  designer,
  designerLinkedIn,
  contentWriter,
  contentWriterLinkedIn,
  socialMedia
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Enhanced debugging logs to check props and links
  useEffect(() => {
    console.log('PostCard Props:', {
      title: title || 'No title provided',
      description: description || 'No description provided',
      date: date || 'No date provided',
      image: image || 'No image provided',
      tags: tags || 'No tags provided',
      designer: designer || 'No designer provided',
      designerLinkedIn: designerLinkedIn ? `Valid: ${designerLinkedIn}` : 'No designer LinkedIn provided',
      contentWriter: contentWriter || 'No content writer provided',
      contentWriterLinkedIn: contentWriterLinkedIn ? `Valid: ${contentWriterLinkedIn}` : 'No content writer LinkedIn provided',
      socialMedia: socialMedia || 'No social media provided'
    });
  }, [title, description, date, image, tags, designer, designerLinkedIn, contentWriter, contentWriterLinkedIn, socialMedia]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/400x225?text=No+Image'} // Fallback image
          alt={title || 'Post Image'}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=No+Image'; // Fallback on error
          }}
        />
      </div>

      <div className="p-6 space-y-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
              >
                {tag || 'No Tag'}
              </span>
            ))}
          </div>
        )}

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title || 'Untitled Post'}</h3>
          <div className="text-gray-400 mb-4">
            <ReactMarkdown className="prose prose-invert max-w-none">
              {description || 'No description available.'}
            </ReactMarkdown>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center text-sm text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current text-purple-400 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate || 'No Date'}
        </div>

        {/* Credits */}
        <div className="pt-4 border-t border-gray-800 space-y-4">
          {/* Designer */}
          {(designer || designerLinkedIn) && (
            <div className="flex items-center">
              <span className="text-gray-400">Designer: </span>
              <a 
                href={validateAndFormatLink(designerLinkedIn)}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-purple-400 ml-2 hover:text-purple-300 transition-colors ${!designerLinkedIn ? 'pointer-events-none' : ''}`}
                onClick={(e) => {
                  if (!designerLinkedIn || validateAndFormatLink(designerLinkedIn) === '#') {
                    e.preventDefault();
                    console.warn('Designer LinkedIn link is missing or invalid, cannot navigate.');
                  }
                }}
              >
                {designer || 'Unknown Designer'}
              </a>
            </div>
          )}

          {/* Content Writer */}
          {(contentWriter || contentWriterLinkedIn) && (
            <div className="flex items-center">
              <span className="text-gray-400">Content Writer: </span>
              <a 
                href={validateAndFormatLink(contentWriterLinkedIn)}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-purple-400 ml-2 hover:text-purple-300 transition-colors ${!contentWriterLinkedIn ? 'pointer-events-none' : ''}`}
                onClick={(e) => {
                  if (!contentWriterLinkedIn || validateAndFormatLink(contentWriterLinkedIn) === '#') {
                    e.preventDefault();
                    console.warn('Content Writer LinkedIn link is missing or invalid, cannot navigate.');
                  }
                }}
              >
                {contentWriter || 'Unknown Writer'}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex justify-center items-center gap-6">
            {socialMedia?.instagram?.link && (
              <a
                href={socialMedia.instagram.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors p-2 hover:bg-pink-500/10 rounded-full"
                onClick={(e) => {
                  if (!socialMedia.instagram?.link) e.preventDefault();
                }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {socialMedia?.linkedin?.link && (
              <a
                href={socialMedia.linkedin.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-blue-500/10 rounded-full"
                onClick={(e) => {
                  if (!socialMedia.linkedin?.link) e.preventDefault();
                }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;