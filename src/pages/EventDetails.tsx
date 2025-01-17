import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { events } from '../data/eventsData';

const EventDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/events')}
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Events
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-[400px] rounded-xl overflow-hidden mb-8"
        >
          <img
            src={event.bannerImg}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Title and Basic Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{event.longDescription}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-500/20 rounded-full text-sm font-medium text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Agenda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Agenda</h2>
          <div className="space-y-8">
            {event.agenda.map((day, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">{day.day}: {day.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {day.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Attend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Why Attend?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.whyAttend.map((reason, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
              >
                <p className="text-gray-300">{reason}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Speakers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.speakers.map((speaker, index) => (
              <div
                key={index}
                onClick={() => window.open(speaker.linkedin, '_blank')}
                className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 
                         cursor-pointer transform hover:scale-105 transition-all duration-300 
                         hover:border-purple-500/50 group"
              >
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover mx-auto 
                           group-hover:ring-2 group-hover:ring-purple-500 transition-all duration-300"
                />
                <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-purple-400 
                             transition-all duration-300">{speaker.name}</h3>
                <p className="text-purple-400 text-center mb-4">{speaker.role}</p>
                <p className="text-gray-400 text-center text-sm">{speaker.bio}</p>
                
                {/* LinkedIn Icon */}
                <div className="mt-4 flex justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Date</h3>
            <p className="text-purple-400">{event.date}</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Venue</h3>
            <p className="text-purple-400">{event.venue}</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Registration</h3>
            <p className="text-purple-400">{event.registrationStatus}</p>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <button
            onClick={() => navigate('/events')}
            className="px-8 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 
                     rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
          >
            Back to Events
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
