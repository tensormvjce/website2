import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';

interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
  location: string;
  registrationLink?: string;
  slug: string;
  status: 'Open' | 'Closed' | 'Ended';
}

const Events: React.FC = () => {
  const navigate = useNavigate();
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
    return <ContentLoader type="event" />;
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
            className="w-full px-4 py-2 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg 
                     focus:outline-none focus:border-purple-500/50 transition-colors duration-300
                     text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedTag === tag 
                  ? 'bg-purple-500/40 text-white' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => navigate(`/events/${event.slug}`)}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors duration-300">
                  <div className="aspect-video">
                    <img
                      src={event.image}
                      alt={event.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Open' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : event.status === 'Ended' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {event.status === 'Open' ? 'Registration Open' : 
                         event.status === 'Ended' ? 'Event Ended' : 
                         'Registration Closed'}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-purple-400 px-2 py-1 rounded-full border border-purple-400/30 terminal-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-400">{event.date}</span>
                      {event.registrationLink && (
                        event.status === 'Open' ? (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                                     rounded-lg text-white font-medium transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Register
                          </a>
                        ) : (
                          <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 
                                         rounded-lg text-gray-500 font-medium cursor-not-allowed">
                            {event.status === 'Ended' ? 'Event Ended' : 'Registration Closed'}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2 group transition-all duration-300">
                        Read More
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6" 
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Events;
