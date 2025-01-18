import React from 'react';
import { db } from '../services/firebase';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import ItemCard from '../components/ItemCard';

const Blogs: React.FC = () => {
  const { items: blogs, loading, error } = useFirestoreCollection(db, 'blogs');

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
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>
      
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <ItemCard 
              key={blog.id} 
              type="blog"
              {...blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
