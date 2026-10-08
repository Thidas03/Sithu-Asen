import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvitationCover({ onOpen }) {
  const handleOpen = () => {
    // Fire celebratory golden confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#AA8C2C', '#F3E7C4', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }

    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-luxury-dark text-white px-6 overflow-hidden select-none"
    >
      {/* Background couple photo with heavy vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_20%] opacity-25 scale-105"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/95 to-luxury-dark" />

      {/* Royal double borders */}
      <div className="absolute inset-4 sm:inset-8 border border-gold/30 rounded-2xl pointer-events-none" />
      <div className="absolute inset-6 sm:inset-10 border border-gold/15 rounded-xl pointer-events-none" />

      {/* Corner Ornaments */}
      <div className="absolute top-7 left-7 sm:top-11 sm:left-11 text-gold/60 pointer-events-none text-xs">✦</div>
      <div className="absolute top-7 right-7 sm:top-11 sm:right-11 text-gold/60 pointer-events-none text-xs">✦</div>
      <div className="absolute bottom-7 left-7 sm:bottom-11 sm:left-11 text-gold/60 pointer-events-none text-xs">✦</div>
      <div className="absolute bottom-7 right-7 sm:bottom-11 sm:right-11 text-gold/60 pointer-events-none text-xs">✦</div>

      {/* Card Content */}
      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center py-6">
        
        {/* Monogram */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center space-x-2 text-gold mb-5"
        >
          <span className="font-serif text-2xl tracking-widest font-light">S</span>
          <Heart className="w-4 h-4 fill-gold/30 text-gold" />
          <span className="font-serif text-2xl tracking-widest font-light">A</span>
        </motion.div>

        {/* Top Eyebrow */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold/90 mb-3"
        >
          Wedding Invitation
        </motion.p>

        {/* Names */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide leading-tight mb-3"
        >
          Sithumi <span className="text-gold italic font-normal">&</span> Asen
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-serif italic text-beige-light/80 text-sm sm:text-base font-light mb-7 max-w-xs"
        >
          "Together with their families, invite you to celebrate their wedding"
        </motion.p>

        {/* Date and Venue */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-9 text-center"
        >
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.22em] text-beige/70 uppercase">
            November 05, 2026 • Galle Face Hotel
          </p>
        </motion.div>

        {/* Golden Wax Seal Action Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleOpen}
            className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-luxury-dark shadow-[0_0_35px_rgba(212,175,55,0.45)] border-2 border-white/40 cursor-pointer transition-all duration-300"
            aria-label="Open Wedding Invitation"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-2 rounded-full border border-gold/50 animate-ping opacity-60 pointer-events-none" />

            <MailOpen className="w-7 h-7 text-luxury-dark mb-1 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-luxury-dark">
              Open
            </span>
          </motion.button>

          {/* Soundtrack indicator */}
          <div className="flex items-center space-x-1.5 mt-5 text-gold/80 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase">
            <Music className="w-3.5 h-3.5 animate-pulse text-gold" />
            <span>Includes Wedding Soundtrack</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
