import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';
import {
  CARD_CLASSES,
  CARD_INNER_CLASSES,
  CARD_IMAGE_CLASSES,
  CARD_IMAGE_INNER_CLASSES,
  CARD_CONTENT_CLASSES,
  CARD_TAGS_CLASSES,
  CARD_TAG_CLASSES,
  CARD_TITLE_CLASSES,
  CARD_DESCRIPTION_CLASSES,
  CARD_FOOTER_CLASSES
} from '../styles/cardStyles';
import { ArrowRight } from 'lucide-react';

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
    <div className="events-bg">
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

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 uppercase tracking-wider text-sm ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
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
                <div className={CARD_CLASSES}>
                  <div className={CARD_INNER_CLASSES}>
                    <div className={CARD_IMAGE_CLASSES}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className={CARD_IMAGE_INNER_CLASSES}
                        onError={handleImageError}
                      />
                    </div>
                    <div className={CARD_CONTENT_CLASSES}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={CARD_TITLE_CLASSES}>{event.title}</h3>
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
                      <div className={CARD_TAGS_CLASSES}>
                        {event.tags?.map((tag) => (
                          <span key={tag} className={CARD_TAG_CLASSES}>{tag}</span>
                        ))}
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <p className={CARD_DESCRIPTION_CLASSES}>{event.description}</p>
                      </div>
                      <div className={CARD_FOOTER_CLASSES}>
                        <div className="flex items-center text-sm text-purple-400">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 stroke-current mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform text-purple-400" />
                      </div>
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
