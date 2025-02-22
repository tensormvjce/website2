import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TeamGalleryProps {
  mainPhoto: string;
  additionalPhotos?: string[];
}

const TeamGallery: React.FC<TeamGalleryProps> = ({ mainPhoto, additionalPhotos = [] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const allPhotos = [mainPhoto, ...additionalPhotos];

  const handlePrevious = () => {
    if (selectedPhoto) {
      const currentIndex = allPhotos.indexOf(selectedPhoto);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
      setSelectedPhoto(allPhotos[newIndex]);
    }
  };

  const handleNext = () => {
    if (selectedPhoto) {
      const currentIndex = allPhotos.indexOf(selectedPhoto);
      const newIndex = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
      setSelectedPhoto(allPhotos[newIndex]);
    }
  };

  return (
    <div className="mb-12">
      {/* Main Photo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-[16/9] mb-4 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={mainPhoto}
          alt="Team group photo"
          className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
          onClick={() => setSelectedPhoto(mainPhoto)}
        />
      </motion.div>

      {/* Additional Photos */}
      {additionalPhotos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {additionalPhotos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative aspect-square group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={photo}
                alt={`Team event photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setSelectedPhoto(photo)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedPhoto}
                alt="Team photo"
                className="max-h-[80vh] w-auto object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamGallery;
