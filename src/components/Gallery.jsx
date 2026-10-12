import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const photos = [
  {
    src: "/gallery-1.jpg",
    alt: "Sithumi & Asen Gallery Moment 1",
  },
  {
    src: "/gallery-2.jpg",
    alt: "Sithumi & Asen Gallery Moment 2",
  },
  {
    src: "/gallery-3.jpg",
    alt: "Sithumi & Asen Gallery Moment 3",
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
              {/* Image container matching natural 2:3 portrait ratio */}
              <div className="aspect-[2/3] w-full overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Expand Icon (no text) */}
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white transition-all duration-300 pointer-events-none">
                  <div className="p-3.5 rounded-full bg-black/40 backdrop-blur-md border border-gold/50 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Eye className="w-5 h-5 text-gold-light" />
                  </div>
                </div>

                {/* Elegant gold border frame on hover */}
                <div className="absolute inset-3 border border-gold/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center"
            >
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].alt}
                className="max-w-full max-h-[82vh] object-contain rounded-xl border border-gold/30 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
