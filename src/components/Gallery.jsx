import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const photos = [
  {
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    caption: "The Rings",
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    caption: "A Walk to Remember",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    caption: "Sweet Embraces",
  }
];

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = '';
  };

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Keyboard controls for lightbox navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  return (
    <section id="gallery" className="py-24 px-6 bg-beige-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section title */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Captured Moments</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">Our Gallery</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <Image className="w-4 h-4 text-gold" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* 3-Photo Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => openLightbox(index)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/15 bg-luxury-dark/5"
            >
              {/* Image container with fixed elegant portrait aspect ratio */}
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient overlay for caption contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/85 via-luxury-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover / Caption Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white transition-all duration-300">
                  <div className="p-3 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40 mb-3 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-gold-light" />
                  </div>
                  <span className="font-serif text-xl font-light tracking-wide text-white drop-shadow-md group-hover:text-gold-light transition-colors duration-300">
                    {photo.caption}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view
                  </span>
                </div>

                {/* Elegant gold border frame on hover */}
                <div className="absolute inset-3 border border-gold/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-luxury-dark/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300 z-[110] bg-white/10 p-2.5 rounded-full hover:bg-white/20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 text-white/70 hover:text-white transition-colors duration-300 z-[110] bg-white/10 p-3 rounded-full hover:bg-white/20"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextPhoto}
              className="absolute right-6 text-white/70 hover:text-white transition-colors duration-300 z-[110] bg-white/10 p-3 rounded-full hover:bg-white/20"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-gold/30 shadow-2xl"
              />
              
              {/* Photo Caption */}
              <div className="mt-4 text-center">
                <p className="font-serif text-xl md:text-2xl text-gold font-light tracking-wider">
                  {photos[activePhotoIndex].caption}
                </p>
                <p className="font-sans text-[10px] md:text-xs text-white/50 uppercase tracking-widest mt-1">
                  {activePhotoIndex + 1} of {photos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
