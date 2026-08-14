import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const photos = [
  {
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    caption: "The Rings",
    ratio: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=800&q=80",
    caption: "Elegant Table Setting",
    ratio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
    caption: "A Walk to Remember",
    ratio: "aspect-[2/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    caption: "Celebrations",
    ratio: "aspect-[2/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    caption: "Sweet Embraces",
    ratio: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80",
    caption: "The Bouquet",
    ratio: "aspect-[4/3]",
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
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

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

        {/* Gallery Grid (Pinterest/Masonry Style on larger viewports) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-luxury-dark/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2 text-white">
                <Eye className="w-6 h-6 text-gold" />
                <span className="font-serif text-lg font-light tracking-wider">{photo.caption}</span>
              </div>

              {/* Elegant Thin border frame shown on hover */}
              <div className="absolute inset-3 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
            className="fixed inset-0 bg-luxury-dark/95 z-[100] flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300 z-[110]"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 text-white/50 hover:text-white transition-colors duration-300 z-[110] bg-white/5 p-3 rounded-full hover:bg-white/10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextPhoto}
              className="absolute right-6 text-white/50 hover:text-white transition-colors duration-300 z-[110] bg-white/5 p-3 rounded-full hover:bg-white/10"
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
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
            >
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-gold/20 shadow-2xl"
              />
              
              {/* Photo Caption */}
              <div className="mt-4 text-center">
                <p className="font-serif text-lg md:text-xl text-gold font-light tracking-wider">
                  {photos[activePhotoIndex].caption}
                </p>
                <p className="font-sans text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-1">
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
