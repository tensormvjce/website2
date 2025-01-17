import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { events, tags, Event } from '../data/eventsData';
import Layout from '../components/Layout';

const Events = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = events.filter(event => {
    const matchesTag = selectedTag === "All" || event.tags.includes(selectedTag);
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const [visibleEvents, setVisibleEvents] = useState<number>(4);

  const handleLoadMore = () => {
    setVisibleEvents(prev => Math.min(prev + 4, filteredEvents.length));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden py-24">
        {/* Background Elements */}
        <div className="noise" />
        <div className="grid-background fixed inset-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-16 glitch"
            data-text="Community Events"
          >
            Community Events
          </motion.h1>

          {/* AI Journey Subtitle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 terminal-text md-space-y-2 text-center mb-12"
          >
            Empowering Innovation Through Technology
          </motion.h2>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleEvents(4); // Reset visible events when searching
              }}
            />
          </div>

          {/* Tags */}
          <div className="mb-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setVisibleEvents(4); // Reset visible events when changing tag
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedTag === tag 
                    ? 'bg-purple-500/40 border-purple-500' 
                    : 'bg-gray-800/40 border-gray-700 hover:border-purple-500/50'} 
                  border`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.slice(0, visibleEvents).map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                >
                  {/* Event Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = './events/placeholder.webp';
                        target.onerror = null;
                      }}
                    />
                  </div>
                  
                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 rounded-md text-xs font-medium text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-purple-400 mb-3">{event.date}</p>
                    <p className="text-gray-400 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {visibleEvents < filteredEvents.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                         rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Load More Events
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
