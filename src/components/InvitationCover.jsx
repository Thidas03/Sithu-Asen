import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvitationCover({ onOpen, onStartAudio, isPlaying, onToggleSound }) {
  const [isOpening, setIsOpening] = useState(false);

  // Trigger celebratory golden confetti shower
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#E6C663', '#FFF5C0', '#FDFBF7', '#C5A059', '#AA8C2C']
      });

      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#D4AF37', '#FAF5EE', '#E6C663']
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#D4AF37', '#FAF5EE', '#E6C663']
        });
      }, 250);
    } catch {
      // safe fallback
    }
  };

  // When user taps the gold wax seal
  const handleSealClick = () => {
    if (isOpening) return;

    // Start background music immediately
    if (onStartAudio) {
      onStartAudio();
    }

    setIsOpening(true);
    fireConfetti();

    // Smoothly transition into the website after the envelope flap opens
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  // Subtle floating ambient gold particles
  const particles = [
    { id: 1, top: '12%', left: '12%', size: 4, duration: 4.5, delay: 0 },
    { id: 2, top: '20%', right: '14%', size: 5, duration: 5.2, delay: 0.8 },
    { id: 3, top: '65%', left: '10%', size: 4, duration: 4.8, delay: 0.4 },
    { id: 4, top: '75%', right: '12%', size: 6, duration: 5.8, delay: 1.2 },
    { id: 5, top: '42%', left: '7%', size: 3, duration: 6.0, delay: 1.6 },
    { id: 6, top: '85%', left: '45%', size: 4, duration: 5.0, delay: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(14px)',
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center text-luxury-dark px-4 py-6 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #FDFBF7 0%, #F8F3EC 45%, #EBE1D0 100%)'
      }}
    >
      {/* Botanical Floral & Bee Embossed Damask Watermark Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236B5014' fill-rule='evenodd'%3E%3Cpath d='M70 25c-2-4-7-6-11-4-3 2-4 5-4 8 0 7 9 14 15 17 6-3 15-10 15-17 0-3-1-6-4-8-4-2-9 0-11 4z' opacity='0.7'/%3E%3Ccircle cx='70' cy='22' r='2'/%3E%3Cpath d='M63 32h14v2H63zM64 36h12v1.5H64z' opacity='0.5'/%3E%3Cpath d='M25 80c5-10 18-12 26-5 4 4 6 9 5 14-2 11-16 19-25 22 1-7 0-15-6-21-4-4-5-8 0-10zm90 0c-5-10-18-12-26-5-4 4-6 9-5 14 2 11 16 19 25 22-1-7 0-15 6-21 4-4 5-8 0-10z' opacity='0.5'/%3E%3Ccircle cx='70' cy='95' r='2.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '110px 110px'
        }}
      />

      {/* Warm Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-white/45 via-transparent to-[#D8C7B0]/30" />

      {/* Floating Ambient Gold Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.3, 0.8, 0.3],
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
            background: 'radial-gradient(circle, #FFF2B2 15%, #D4AF37 80%)',
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.7)'
          }}
        />
      ))}

      {/* Minimal Top Header with Discreet Sound Toggle */}
      <header className="fixed top-6 left-0 right-0 z-40 px-6 max-w-xl mx-auto flex items-center justify-between pointer-events-auto">
        <span className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-gold-dark font-medium opacity-80">
          S & A
        </span>

        {onToggleSound && (
          <button
            onClick={onToggleSound}
            aria-label={isPlaying ? "Mute music" : "Play music"}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-gold/30 shadow-xs backdrop-blur-md transition-all text-luxury-dark/80 hover:text-gold-dark hover:border-gold cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold-dark animate-pulse" />
                <span className="flex space-x-0.5 items-end h-2.5">
                  <span className="w-0.5 h-2.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-luxury-charcoal/60" />
            )}
          </button>
        )}
      </header>

      {/* Main Luxury Envelope Container */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[385px] perspective-1000 flex flex-col items-center my-auto">
        
        {/* THE ENVELOPE */}
        <motion.div 
          initial={{ y: 20, opacity: 0, scale: 0.96 }}
          animate={isOpening ? {
            scale: 1.04,
            transition: { duration: 0.8, ease: "easeOut" }
          } : {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          className="relative w-full rounded-2xl transition-all duration-700"
          style={{
            height: '480px',
            filter: 'drop-shadow(0 25px 45px rgba(160, 130, 80, 0.28)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.08))'
          }}
        >

          {/* Envelope Base / Back Wall with Inner Gold Foil Liner */}
          <div 
            className="absolute inset-0 rounded-2xl border border-gold/35 overflow-hidden z-0"
            style={{
              background: 'linear-gradient(175deg, #FBF8F3 0%, #F5EFE6 100%)',
              boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 6px rgba(180, 150, 100, 0.15)'
            }}
          >
            {/* Interior Gold Liner (revealed when flap opens) */}
            <div 
              className="absolute inset-x-2 top-2 h-44 rounded-t-xl opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 30%, #E8D49B 0%, #CBB06D 60%, #AA8C2C 100%)',
                backgroundImage: `radial-gradient(#AA8C2C 1px, transparent 1px), radial-gradient(#AA8C2C 1px, #E8D49B 1px)`,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px'
              }}
            />
          </div>

          {/* Envelope Front Pocket (Seamless Ivory Cardstock covering full front with V-mouth dip) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 380 480" 
              preserveAspectRatio="none"
            >
              {/* Pocket Body: Solid ivory paper meeting at top corners and dipping down in the center */}
              <path 
                d="M 0 0 L 0 480 L 380 480 L 380 0 L 190 160 Z" 
                fill="#FCFAF6" 
                stroke="rgba(212, 175, 55, 0.4)" 
                strokeWidth="1"
              />
              {/* Subtle origami fold diagonal lines */}
              <path 
                d="M 0 480 L 190 160" 
                stroke="rgba(212, 175, 55, 0.25)" 
                strokeWidth="1"
              />
              <path 
                d="M 380 480 L 190 160" 
                stroke="rgba(212, 175, 55, 0.25)" 
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* THE TOP TRIANGULAR FLAP (3D Perspective Fold Animation) */}
          <motion.div
            initial={false}
            animate={isOpening ? {
              rotateX: -180,
              zIndex: 1,
              transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
            } : {
              rotateX: 0,
              zIndex: 25,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d'
            }}
            className="absolute inset-x-0 top-0 h-[235px] pointer-events-none"
          >
            {/* Flap Front (folds down over pocket) */}
            <div className="absolute inset-0 backface-hidden">
              <svg 
                className="w-full h-full drop-shadow-[0_12px_18px_rgba(160,130,80,0.22)]" 
                viewBox="0 0 380 235" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 0 L190 230 L380 0 Z" 
                  fill="#FCFAF6" 
                  stroke="rgba(212, 175, 55, 0.5)" 
                  strokeWidth="1.2"
                />
                <path 
                  d="M12 6 L190 216 L368 6" 
                  fill="none" 
                  stroke="rgba(212, 175, 55, 0.3)" 
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            {/* Flap Back (revealed when flipped open) */}
            <div 
              className="absolute inset-0 backface-hidden rounded-t-2xl"
              style={{
                transform: 'rotateX(180deg)',
                background: 'linear-gradient(180deg, #F5EFE6 0%, #EFE5D5 100%)',
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                borderTop: '1px solid rgba(212, 175, 55, 0.4)'
              }}
            />
          </motion.div>

          {/* 3D METALLIC GOLD WAX SEAL (Centered at Flap Tip) */}
          <AnimatePresence>
            {!isOpening && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ 
                  scale: 0.6, 
                  opacity: 0, 
                  y: -25,
                  transition: { duration: 0.3 } 
                }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="absolute left-1/2 -translate-x-1/2 top-[182px] z-30 cursor-pointer pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSealClick}
                  className="group relative flex items-center justify-center w-24 h-24 rounded-full transition-transform select-none focus:outline-none cursor-pointer"
                  aria-label="Tap gold wax seal to open invitation"
                >
                  {/* Pulsing Golden Glow Halo */}
                  <span className="absolute -inset-2.5 rounded-full bg-gold/25 blur-md animate-pulse pointer-events-none" />
                  <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping opacity-35 pointer-events-none" />

                  {/* 3D Molten Gold Wax Seal Outer Rim */}
                  <div className="w-22 h-22 rounded-full wax-seal flex items-center justify-center p-1.5 transition-shadow duration-300 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.75)]">
                    
                    {/* Inner Debossed Seal Monogram Ring */}
                    <div className="w-full h-full rounded-full wax-seal-inner flex flex-col items-center justify-center bg-gold-dark/10">
                      
                      {/* Monogram "S & A" */}
                      <div className="flex items-center justify-center text-amber-950 font-serif leading-none mt-0.5">
                        <span 
                          className="text-2xl font-normal tracking-tight font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
                          style={{ textShadow: '0 1px 1px rgba(255, 255, 255, 0.7), 0 -1px 1px rgba(90, 60, 10, 0.8)' }}
                        >
                          S
                        </span>
                        
                        <Heart className="w-3 h-3 mx-0.5 text-amber-900 fill-amber-900/40 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]" />

                        <span 
                          className="text-2xl font-normal tracking-tight font-serif"
                          style={{ textShadow: '0 1px 1px rgba(255, 255, 255, 0.7), 0 -1px 1px rgba(90, 60, 10, 0.8)' }}
                        >
                          A
                        </span>
                      </div>

                      {/* Debossed "OPEN" Label */}
                      <div className="flex items-center space-x-1 mt-0.5 opacity-80">
                        <span className="w-2 h-[0.8px] bg-amber-950" />
                        <span className="font-cinzel text-[7.5px] tracking-[0.25em] text-amber-950 font-bold uppercase">
                          OPEN
                        </span>
                        <span className="w-2 h-[0.8px] bg-amber-950" />
                      </div>
                    </div>

                  </div>
                </motion.button>

                {/* Subtle Prompt Below Seal */}
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center pointer-events-none"
                >
                  <span className="font-cinzel text-[9.5px] uppercase tracking-[0.3em] text-gold-dark font-medium drop-shadow-xs flex items-center space-x-1 opacity-90">
                    <span>Tap seal to open</span>
                    <Sparkles className="w-3 h-3 text-gold animate-spin" style={{ animationDuration: '4s' }} />
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

    </motion.div>
  );
}
