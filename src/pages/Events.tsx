import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';

interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
  location: string;
  registrationLink?: string;
}

const Events: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { items: events = [], loading, error } = useFirestoreCollection<Event>(db, 'events');

  // Filter events based on search query and selected tag
  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) || false;
    
    const matchesTag = selectedTag === "All" || event.tags?.includes(selectedTag) || false;
    return matchesSearch && matchesTag;
  });

  // Extract unique tags from events
  const tags = useMemo(() => {
    const allTags = events.reduce<string[]>((acc, event) => {
      if (event.tags && Array.isArray(event.tags)) {
        acc.push(...event.tags);
      }
      return acc;
    }, []);
    return ["All", ...new Set(allTags)];
  }, [events]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Event+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-purple-400">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400">Error loading events: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 glitch"
            data-text="Events"
          >
            Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text max-w-2xl mx-auto"
          >
            Join us for exciting tech events and workshops
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-800 focus:border-purple-500/50 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-white 
                     placeholder-gray-400 transition-all duration-300"
          />
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-purple-500/30 hover:text-purple-400'
              } border backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredEvents.map((event) => (
              <motion.article
                key={event.id || event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg hover-glow">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    {event.tags?.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs text-purple-400 terminal-text px-2 py-1 rounded-full border border-purple-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 glow-text group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-gray-400 terminal-text text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 
                               rounded-lg border border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Events;
