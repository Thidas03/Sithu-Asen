import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvitationCover({ onOpen, onStartAudio, isPlaying, onToggleSound }) {
  const [isOpening, setIsOpening] = useState(false);

  // Trigger celebratory golden confetti shower
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.49 },
        colors: ['#D4AF37', '#E6C663', '#FFF5C0', '#FDFBF7', '#C5A059', '#AA8C2C']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.5 },
          colors: ['#D4AF37', '#FAF5EE', '#E6C663']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.5 },
          colors: ['#D4AF37', '#FAF5EE', '#E6C663']
        });
      }, 200);
    } catch {
      // safe fallback
    }
  };

  // When user taps the wax seal or card
  const handleOpenClick = () => {
    if (isOpening) return;

    // Start background music immediately
    if (onStartAudio) {
      onStartAudio();
    }

    setIsOpening(true);
    fireConfetti();

    // Smooth transition into the website
    setTimeout(() => {
      onOpen();
    }, 750);
  };

  // Floating ambient gold sparkles
  const particles = [
    { id: 1, top: '16%', left: '18%', size: 4, duration: 4.5, delay: 0 },
    { id: 2, top: '24%', right: '18%', size: 5, duration: 5.2, delay: 0.8 },
    { id: 3, top: '68%', left: '14%', size: 4, duration: 4.8, delay: 0.4 },
    { id: 4, top: '78%', right: '16%', size: 6, duration: 5.8, delay: 1.2 },
    { id: 5, top: '38%', left: '10%', size: 3, duration: 6.0, delay: 1.6 },
    { id: 6, top: '88%', left: '46%', size: 4, duration: 5.0, delay: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[150] w-full h-[100dvh] flex items-center justify-center overflow-hidden select-none bg-[#EDE5D8]"
    >
      {/* 
        Full Screen Luxury Invitation Card 
        - On mobile: fills 100% of the screen edge-to-edge with no outer background
        - On tablet/desktop: elegantly framed vertical luxury folio card with subtle shadow
      */}
      <div className="relative w-full h-full sm:max-w-[480px] sm:h-[94vh] sm:rounded-2xl sm:shadow-[0_25px_60px_-15px_rgba(140,105,40,0.35)] overflow-hidden flex items-center justify-center bg-[#F7F2EA]">
        
        {/* Discreet Sound Toggle in top-right */}
        <div className="absolute top-4 sm:top-6 right-5 sm:right-6 z-40 pointer-events-auto">
          {onToggleSound && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSound();
              }}
              aria-label={isPlaying ? "Mute music" : "Play music"}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#D4AF37]/45 shadow-xs backdrop-blur-md transition-all text-neutral-800 hover:text-[#AA8C2C] hover:border-[#D4AF37] cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#AA8C2C] animate-pulse" />
                  <span className="flex space-x-0.5 items-end h-2.5">
                    <span className="w-0.5 h-2.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-neutral-600" />
              )}
            </button>
          )}
        </div>

        {/* Full Screen Card Surface */}
        <img
          src="/invitation-card-full.jpg"
          alt="Sithumi & Asen Wedding Invitation"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Ambient Subtle Golden Light Shimmer Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 48%, rgba(255,245,210,0.8) 0%, rgba(212,175,55,0.15) 50%, transparent 80%)'
          }}
        />

        {/* Floating Ambient Gold Sparkles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.25, 0.75, 0.25],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: 'radial-gradient(circle, #FFF2B2 20%, #D4AF37 80%)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.7)'
            }}
          />
        ))}

        {/* 
          Interactive Wax Seal Hotspot (Positioned exactly over the center wax seal in the card)
          - Y center is at ~48.7%
          - X center is at 50%
        */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center cursor-pointer pointer-events-auto"
          style={{ top: '48.7%' }}
        >
          <motion.button
            onClick={handleOpenClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer focus:outline-none select-none"
            aria-label="Click wax seal to open invitation"
          >
            {/* Pulsing Golden Aura Halo Rings */}
            <motion.span 
              animate={{ 
                scale: [1, 1.18, 1],
                opacity: [0.35, 0.75, 0.35]
              }}
              transition={{ 
                duration: 2.4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 to-[#FFF5C0]/40 blur-md pointer-events-none" 
            />

            <span className="absolute -inset-2 rounded-full border border-[#D4AF37]/50 animate-ping opacity-25 pointer-events-none" />

            {/* Subtle Rotating Accent Ring */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full border border-dashed border-[#FFF5C0]/35 pointer-events-none"
            />

            {/* Tap Hotspot Circle */}
            <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(212,175,55,0.7)]" />
          </motion.button>
        </div>

        {/* Pure Text Prompt: "OPEN THE INVITATION" (Not a button, just clean text below the wax seal) */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.75, 1, 0.75],
                y: [0, 2, 0]
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              onClick={handleOpenClick}
              className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center cursor-pointer select-none pointer-events-auto whitespace-nowrap"
              style={{ top: 'calc(48.7% + 72px)' }}
            >
              <span 
                className="font-cinzel text-[10px] sm:text-[11.5px] tracking-[0.28em] text-[#634C24] uppercase font-medium select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] hover:text-[#4A3716] transition-colors"
                style={{
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)'
                }}
              >
                OPEN THE INVITATION
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Flash Overlay on Open */}
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/30 via-white/70 to-transparent pointer-events-none z-40"
          />
        )}

      </div>

    </motion.div>
  );
}
