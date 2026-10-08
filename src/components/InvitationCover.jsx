import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvitationCover({ onOpen }) {
  const handleOpen = () => {
    // Fire celebratory royal gold confetti shower
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE28A', '#D4AF37', '#AA8C2C', '#FFFFFF', '#FAF8F5']
      });
    } catch {
      // safe fallback
    }

    onOpen();
  };

  // Subtle floating ambient gold particles
  const particles = [
    { id: 1, top: '15%', left: '12%', size: 4, duration: 4, delay: 0 },
    { id: 2, top: '25%', right: '14%', size: 6, duration: 5, delay: 1 },
    { id: 3, top: '70%', left: '18%', size: 5, duration: 4.5, delay: 0.5 },
    { id: 4, top: '80%', right: '15%', size: 4, duration: 6, delay: 1.5 },
    { id: 5, top: '45%', left: '8%', size: 3, duration: 5.5, delay: 2 },
    { id: 6, top: '55%', right: '8%', size: 5, duration: 4.2, delay: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.06,
        filter: 'blur(10px)',
        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-luxury-dark text-white px-4 py-6 overflow-y-auto overflow-x-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1E1C17 0%, #12110E 60%, #0A0A08 100%)'
      }}
    >
      {/* Background romantic photo with dark luxury overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_20%] opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/90 to-luxury-dark pointer-events-none" />

      {/* Floating Ambient Gold Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-gold pointer-events-none blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
          }}
        />
      ))}

      {/* The Royal Physical Invitation Card Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] rounded-3xl p-7 sm:p-9 text-center my-auto transition-all duration-300"
        style={{
          background: 'linear-gradient(165deg, rgba(32, 30, 25, 0.94) 0%, rgba(20, 19, 15, 0.97) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 45px rgba(212,175,55,0.12)',
          border: '1px solid rgba(212, 175, 55, 0.35)'
        }}
      >
        {/* Inset Hairline Gold Border */}
        <div className="absolute inset-2.5 sm:inset-3 border border-gold/20 rounded-2xl pointer-events-none" />

        {/* Ornate Corner Accents */}
        <svg className="absolute top-4 left-4 w-6 h-6 text-gold/60 pointer-events-none" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M4 36V12C4 7.58172 7.58172 4 12 4H36" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 36V16C10 12.6863 12.6863 10 16 10H36" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>

        <svg className="absolute top-4 right-4 w-6 h-6 text-gold/60 pointer-events-none rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M4 36V12C4 7.58172 7.58172 4 12 4H36" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 36V16C10 12.6863 12.6863 10 16 10H36" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>

        <svg className="absolute bottom-4 left-4 w-6 h-6 text-gold/60 pointer-events-none -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M4 36V12C4 7.58172 7.58172 4 12 4H36" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 36V16C10 12.6863 12.6863 10 16 10H36" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>

        <svg className="absolute bottom-4 right-4 w-6 h-6 text-gold/60 pointer-events-none rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M4 36V12C4 7.58172 7.58172 4 12 4H36" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 36V16C10 12.6863 12.6863 10 16 10H36" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>

        {/* Royal Crest Monogram with Laurel Leaves */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col items-center justify-center mb-4"
        >
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 bg-gold/5 shadow-inner">
            <span className="font-serif text-xl tracking-wider text-gold font-light">S</span>
            <Heart className="w-3 h-3 text-gold fill-gold/40 mx-0.5" />
            <span className="font-serif text-xl tracking-wider text-gold font-light">A</span>
            
            {/* Tiny gold dot ornaments */}
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
        </motion.div>

        {/* Elegant Calligraphic Intro */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-script text-2xl sm:text-3xl text-gold-light tracking-wide mb-1"
        >
          Together with their families
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-beige/70 mb-3"
        >
          Request the pleasure of your company
        </motion.p>

        {/* Grand Couple Names with Shimmering Foil Effect */}
        <motion.h1 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-serif text-4xl sm:text-5xl font-light text-gold-foil tracking-wide leading-tight my-2 drop-shadow-md"
        >
          Sithumi <span className="font-script text-3xl sm:text-4xl text-gold font-normal px-1">&</span> Asen
        </motion.h1>

        {/* Wedding Celebration Text */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold/80 font-light mt-1 mb-4"
        >
          At their Wedding Celebration
        </motion.p>

        {/* Elegant Divider with Diamond */}
        <div className="flex items-center justify-center space-x-3 my-3">
          <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
          <Sparkles className="w-3 h-3 text-gold/80" />
          <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Date and Venue */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-7 space-y-1"
        >
          <p className="font-serif italic text-base sm:text-lg text-white font-light tracking-wider">
            Thursday, November 5, 2026
          </p>
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.22em] text-beige/75 uppercase font-light">
            Galle Face Hotel • Colombo
          </p>
        </motion.div>

        {/* Realistic 3D Golden Wax Seal Button */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col items-center justify-center pt-1"
        >
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleOpen}
            className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-full wax-seal cursor-pointer transition-transform duration-300 select-none"
            aria-label="Open Wedding Invitation"
          >
            {/* Ambient Pulsing Glow Aura */}
            <span className="absolute -inset-3 rounded-full bg-gold/25 blur-md animate-pulse pointer-events-none" />
            <span className="absolute -inset-1.5 rounded-full border border-gold/40 animate-ping opacity-50 pointer-events-none" />

            {/* Inner Stitched Dashed Ring */}
            <div className="w-[74px] h-[74px] rounded-full wax-seal-inner flex flex-col items-center justify-center p-1">
              <span className="font-serif text-lg tracking-widest text-[#4A370A] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] group-hover:scale-105 transition-transform duration-300">
                S&A
              </span>
              <span className="font-cinzel text-[8.5px] font-bold tracking-[0.25em] uppercase text-[#4A370A] mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                OPEN
              </span>
            </div>
          </motion.button>

          {/* Invitation Action Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-4 flex flex-col items-center space-y-1"
          >
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-gold-light/90 font-medium">
              Tap wax seal to open
            </span>
            <div className="flex items-center space-x-1.5 text-beige/50 text-[9.5px] font-sans tracking-widest uppercase">
              <Music className="w-3 h-3 text-gold/80 animate-pulse" />
              <span>Includes Wedding Soundtrack</span>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
