import React from 'react';
import { motion } from 'framer-motion';
import { FirestoreItem } from '../hooks/useFirestoreCollection';

interface ItemCardProps extends FirestoreItem {
  type: 'blog' | 'project' | 'event';
  loading?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  title, 
  description, 
  date, 
  image, 
  tags = [], 
  type,
  loading = false
}) => {
  // Format date with type safety
  const formattedDate = React.useMemo(() => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }, [date]);

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
            <span className="text-sm text-purple-400 capitalize">{type}</span>
          </div>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            {formattedDate && (
              <span className="text-sm text-purple-400">{formattedDate}</span>
            )}
            {tags.length > 0 && (
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
