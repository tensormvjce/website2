import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirestoreItem } from '../hooks/useFirestoreCollection';

const EventDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<FirestoreItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const q = query(
          collection(db, 'events'), 
          where('slug', '==', slug)
        );

        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data() as FirestoreItem;
          setEvent({
            id: querySnapshot.docs[0].id,
            ...eventData
          });
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Event Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 relative"
        >
          <div className="w-full h-[400px] overflow-hidden rounded-2xl">
            <img
              src={event.bannerImg || event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = './events/placeholder.webp';
                target.onerror = null;
              }}
            />
          </div>
          
          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-6">
            <h1 className="text-4xl font-bold text-white">{event.title}</h1>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-purple-400">{event.date}</span>
              <span className="text-green-400 bg-green-500/20 px-2 py-1 rounded-full text-sm">
                {event.registrationStatus}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Event Description</h2>
          <p className="text-gray-300 leading-relaxed">{event.longDescription || event.description}</p>
        </motion.div>

        {/* Event Details Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Event Venue */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Venue</h3>
            <p className="text-gray-300">{event.venue || 'TBA'}</p>
          </div>

          {/* Event Duration */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Duration</h3>
            <p className="text-gray-300">{event.duration || 'TBA'}</p>
          </div>
        </motion.div>

        {/* Agenda */}
        {event.agenda && event.agenda.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Event Agenda</h2>
            {event.agenda.map((agendaItem, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-gray-700 last:border-b-0">
                <h3 className="text-lg font-medium text-purple-400 mb-2">{agendaItem.day}</h3>
                <h4 className="text-white mb-2">{agendaItem.title}</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {agendaItem.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {/* Why Attend */}
        {event.whyAttend && event.whyAttend.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-900/50 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Why Attend</h2>
            <ul className="space-y-3">
              {event.whyAttend.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span className="text-gray-300">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-semibold text-white text-center mb-8">Speakers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.speakers.map((speaker, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900/50 rounded-xl p-6 text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                    <img 
                      src={speaker.avatar} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = './speakers/placeholder.webp';
                        target.onerror = null;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{speaker.name}</h3>
                  <p className="text-purple-400 mb-4">{speaker.role}</p>
                  <p className="text-gray-300 text-sm">{speaker.bio}</p>
                  {speaker.linkedin && (
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-blue-400 hover:text-blue-300"
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Events Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
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
