import React from 'react';
import { FirestoreItem } from '../hooks/useFirestoreCollection';

interface ItemCardProps extends FirestoreItem {
  type: 'blog' | 'project' | 'event';
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  title, 
  description, 
  date, 
  image, 
  tags = [], // Default to empty array
  type 
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

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title || 'Item image'} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-sm text-gray-400 capitalize">{type}</span>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          {formattedDate && (
            <span className="text-sm text-purple-400">{formattedDate}</span>
          )}
          {tags.length > 0 && (
            <div className="flex space-x-2">
              {tags.map((tag, index) => (
                <span 
                  key={`${tag}-${index}`}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
