import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowRight, ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const handleRsvpClick = (e) => {
    e.preventDefault();
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#countdown') || document.querySelector('#couple') || document.querySelector('#event-details');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between pt-20 pb-8 sm:pt-24 sm:pb-12 px-4 overflow-hidden bg-[#0D0B08] select-none"
    >
      {/* Background Wedding Photo with subtle zoom */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 0.72 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-[center_60%] sm:bg-[center_55%]"
        style={{
          backgroundImage: `url('/hero.jpg')`,
        }}
      />

      {/* Cinematic Dark Warm Vignette Overlays for High-End Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

      {/* Main Centered Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center max-w-xl mx-auto flex flex-col items-center justify-center my-auto w-full"
      >
        {/* Top Tilted Botanical Leaf Sprig */}
        <motion.div variants={itemVariants} className="mb-2">
          <svg 
            viewBox="0 0 60 60" 
            className="w-9 h-9 text-[#E6C663] fill-none stroke-current"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 18 48 C 25 38 34 24 43 11" />
            <path d="M 43 11 C 46 7 51 9 46 14 C 43 15 42 13 43 11 Z" fill="rgba(230, 198, 99, 0.45)" />
            <path d="M 38 18 C 45 15 48 19 41 23 C 38 24 37 20 38 18 Z" fill="rgba(230, 198, 99, 0.45)" />
            <path d="M 33 24 C 26 21 23 27 30 30 C 33 30 33 26 33 24 Z" fill="rgba(230, 198, 99, 0.45)" />
            <path d="M 28 31 C 35 28 38 33 31 36 C 28 37 27 33 28 31 Z" fill="rgba(230, 198, 99, 0.45)" />
            <path d="M 23 37 C 16 34 13 40 20 43 C 23 43 23 39 23 37 Z" fill="rgba(230, 198, 99, 0.45)" />
            <path d="M 18 44 C 24 41 27 46 21 49 C 18 50 17 46 18 44 Z" fill="rgba(230, 198, 99, 0.45)" />
          </svg>
        </motion.div>

        {/* Invitation Heading */}
        <motion.div variants={itemVariants} className="space-y-0.5 mb-2">
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#F3E7C4] uppercase font-medium">
            YOU ARE CORDIALLY
          </p>
          <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] text-[#F3E7C4] uppercase font-medium">
            INVITED
          </p>
        </motion.div>

        {/* Heart Divider: ─── ♡ ─── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3 my-2 opacity-85">
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
          <Heart className="w-3.5 h-3.5 text-[#E6C663] fill-transparent stroke-[1.5]" />
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
        </motion.div>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="font-cinzel text-[10px] sm:text-[11.5px] tracking-[0.35em] text-[#E6C663] uppercase my-2 font-medium"
        >
          WE ARE GETTING MARRIED
        </motion.p>

        {/* Couple Names in Flowing Darleston Calligraphy */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center justify-center my-1"
        >
          <h1 
            className="font-darleston text-7xl sm:text-8xl md:text-9xl text-[#F6E9C8] leading-[0.85] tracking-normal select-none"
            style={{
              textShadow: '0 4px 22px rgba(0, 0, 0, 0.95), 0 0 32px rgba(212, 175, 55, 0.35)'
            }}
          >
            Sithumi
          </h1>
          
          <span 
            className="font-darleston text-3xl sm:text-4xl md:text-5xl text-[#E6C663] my-0 select-none opacity-90"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            &
          </span>

          <h2 
            className="font-darleston text-7xl sm:text-8xl md:text-9xl text-[#F6E9C8] leading-[0.85] tracking-normal select-none"
            style={{
              textShadow: '0 4px 22px rgba(0, 0, 0, 0.95), 0 0 32px rgba(212, 175, 55, 0.35)'
            }}
          >
            Asen
          </h2>
        </motion.div>

        {/* Divider below names */}
        <motion.div
          variants={itemVariants}
          className="w-24 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent mx-auto my-3 sm:my-3.5"
        />

        {/* Venue */}
        <motion.p
          variants={itemVariants}
          className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] text-[#F3E7C4] uppercase font-normal mb-1.5"
        >
          GALLE FACE HOTEL, COLOMBO
        </motion.p>

        {/* Location Pin & Date */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center space-y-1 mb-3.5">
          <MapPin className="w-3.5 h-3.5 text-[#E6C663] stroke-[1.5]" />
          <p className="font-serif italic text-sm sm:text-base text-[#E6C663] tracking-[0.18em]">
            November 05, 2026
          </p>
        </motion.div>

        {/* CTA Button flanked by botanical leaf sprigs */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center space-x-2.5 sm:space-x-4 my-2.5"
        >
          {/* Left Leaf Sprig with detailed leaves & floral buds */}
          <svg viewBox="0 0 64 28" className="w-8 sm:w-10 h-5 sm:h-6 text-[#E6C663] fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 62 14 C 40 14 20 13 4 14" />
            <path d="M 4 14 C 1 12 1 16 4 14 Z" fill="currentColor" />
            <path d="M 16 14 C 12 7 21 5 19 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 16 14 C 12 21 21 23 19 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 34 14 C 30 6 40 4 37 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 34 14 C 30 22 40 24 37 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 52 14 C 48 6 58 4 55 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 52 14 C 48 22 58 24 55 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <circle cx="25" cy="8" r="1.3" fill="currentColor" />
            <circle cx="25" cy="20" r="1.3" fill="currentColor" />
            <circle cx="43" cy="8" r="1.3" fill="currentColor" />
            <circle cx="43" cy="20" r="1.3" fill="currentColor" />
          </svg>

          {/* Pill Button */}
          <a
            href="#rsvp"
            onClick={handleRsvpClick}
            className="group px-6 sm:px-8 py-3 rounded-full border border-[#D4AF37]/80 bg-black/35 hover:bg-[#D4AF37] hover:text-luxury-dark backdrop-blur-xs text-[#E6C663] text-[10.5px] sm:text-xs tracking-[0.24em] uppercase font-cinzel transition-all duration-300 shadow-lg flex items-center space-x-2 cursor-pointer select-none"
          >
            <span>JOIN OUR CELEBRATION</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Right Leaf Sprig (Mirrored) */}
          <svg viewBox="0 0 64 28" className="w-8 sm:w-10 h-5 sm:h-6 text-[#E6C663] fill-none stroke-current scale-x-[-1]" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 62 14 C 40 14 20 13 4 14" />
            <path d="M 4 14 C 1 12 1 16 4 14 Z" fill="currentColor" />
            <path d="M 16 14 C 12 7 21 5 19 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 16 14 C 12 21 21 23 19 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 34 14 C 30 6 40 4 37 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 34 14 C 30 22 40 24 37 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 52 14 C 48 6 58 4 55 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <path d="M 52 14 C 48 22 58 24 55 14 Z" fill="rgba(230, 198, 99, 0.35)" />
            <circle cx="25" cy="8" r="1.3" fill="currentColor" />
            <circle cx="25" cy="20" r="1.3" fill="currentColor" />
            <circle cx="43" cy="8" r="1.3" fill="currentColor" />
            <circle cx="43" cy="20" r="1.3" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div variants={itemVariants} className="mt-3 sm:mt-4">
          <a
            href="#countdown"
            onClick={handleScrollClick}
            className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
          >
            <span className="font-cinzel text-[9px] uppercase tracking-[0.35em] text-[#F3E7C4] mb-1.5">
              SCROLL DOWN
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#E6C663] animate-bounce group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom-left Corner Botanical Flourish with detailed leaf veins */}
      <div className="absolute bottom-2 left-2 pointer-events-none opacity-55 sm:opacity-75">
        <svg 
          viewBox="0 0 120 150" 
          className="w-20 sm:w-28 h-28 sm:h-38 text-[#D4AF37]" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Main branch rising up left side */}
          <path d="M 4 146 C 10 100 24 50 56 6" />
          <path d="M 56 6 C 60 2 64 3 61 9 C 57 14 54 11 56 6 Z" />
          <line x1="56" y1="6" x2="60" y2="8" strokeWidth="0.8" />
          
          <path d="M 48 26 C 60 18 64 26 53 31 C 48 33 46 29 48 26 Z" />
          <line x1="48" y1="26" x2="57" y2="24" strokeWidth="0.8" />
          
          <path d="M 41 31 C 29 23 25 31 34 36 C 39 38 41 34 41 31 Z" />
          <line x1="41" y1="31" x2="32" y2="28" strokeWidth="0.8" />
          
          <path d="M 33 55 C 47 47 52 56 42 61 C 36 64 33 59 33 55 Z" />
          <line x1="33" y1="55" x2="43" y2="53" strokeWidth="0.8" />
          
          <path d="M 26 62 C 12 52 7 62 18 68 C 24 71 26 66 26 62 Z" />
          <line x1="26" y1="62" x2="15" y2="58" strokeWidth="0.8" />
          
          <path d="M 20 88 C 34 80 40 90 29 96 C 23 99 19 93 20 88 Z" />
          <line x1="20" y1="88" x2="30" y2="86" strokeWidth="0.8" />
          
          <path d="M 14 96 C 1 85 -5 96 6 102 C 12 105 14 100 14 96 Z" />
          <line x1="14" y1="96" x2="3" y2="92" strokeWidth="0.8" />

          {/* Secondary branch along bottom */}
          <path d="M 4 146 C 45 142 85 136 116 116" />
          <path d="M 116 116 C 120 113 122 117 117 121 C 112 123 114 119 116 116 Z" />
          <path d="M 92 127 C 101 117 106 125 98 131 Z" />
          <path d="M 88 133 C 83 144 92 147 94 137 Z" />
          <path d="M 60 137 C 67 126 73 134 65 141 Z" />
          <path d="M 56 143 C 50 152 59 154 62 145 Z" />
        </svg>
      </div>

      {/* Bottom-right Corner Botanical Flourish (Mirrored) */}
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-55 sm:opacity-75 scale-x-[-1]">
        <svg 
          viewBox="0 0 120 150" 
          className="w-20 sm:w-28 h-28 sm:h-38 text-[#D4AF37]" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Main branch rising up side */}
          <path d="M 4 146 C 10 100 24 50 56 6" />
          <path d="M 56 6 C 60 2 64 3 61 9 C 57 14 54 11 56 6 Z" />
          <line x1="56" y1="6" x2="60" y2="8" strokeWidth="0.8" />
          
          <path d="M 48 26 C 60 18 64 26 53 31 C 48 33 46 29 48 26 Z" />
          <line x1="48" y1="26" x2="57" y2="24" strokeWidth="0.8" />
          
          <path d="M 41 31 C 29 23 25 31 34 36 C 39 38 41 34 41 31 Z" />
          <line x1="41" y1="31" x2="32" y2="28" strokeWidth="0.8" />
          
          <path d="M 33 55 C 47 47 52 56 42 61 C 36 64 33 59 33 55 Z" />
          <line x1="33" y1="55" x2="43" y2="53" strokeWidth="0.8" />
          
          <path d="M 26 62 C 12 52 7 62 18 68 C 24 71 26 66 26 62 Z" />
          <line x1="26" y1="62" x2="15" y2="58" strokeWidth="0.8" />
          
          <path d="M 20 88 C 34 80 40 90 29 96 C 23 99 19 93 20 88 Z" />
          <line x1="20" y1="88" x2="30" y2="86" strokeWidth="0.8" />
          
          <path d="M 14 96 C 1 85 -5 96 6 102 C 12 105 14 100 14 96 Z" />
          <line x1="14" y1="96" x2="3" y2="92" strokeWidth="0.8" />

          {/* Secondary branch along bottom */}
          <path d="M 4 146 C 45 142 85 136 116 116" />
          <path d="M 116 116 C 120 113 122 117 117 121 C 112 123 114 119 116 116 Z" />
          <path d="M 92 127 C 101 117 106 125 98 131 Z" />
          <path d="M 88 133 C 83 144 92 147 94 137 Z" />
          <path d="M 60 137 C 67 126 73 134 65 141 Z" />
          <path d="M 56 143 C 50 152 59 154 62 145 Z" />
        </svg>
      </div>
    </section>
  );
}
