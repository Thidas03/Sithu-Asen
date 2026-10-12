import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
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

  // Subtle floating ambient gold particles
  const particles = [
    { id: 1, top: '15%', left: '14%', size: 3, duration: 4.8, delay: 0 },
    { id: 2, top: '25%', right: '16%', size: 4, duration: 5.4, delay: 0.8 },
    { id: 3, top: '65%', left: '12%', size: 3, duration: 4.5, delay: 0.4 },
    { id: 4, top: '75%', right: '14%', size: 4, duration: 5.8, delay: 1.2 },
    { id: 5, top: '45%', left: '10%', size: 2.5, duration: 6.0, delay: 1.6 },
    { id: 6, top: '85%', left: '46%', size: 3.5, duration: 5.0, delay: 0.7 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0D0B08] select-none"
    >
      {/* Subtle Ambient Vignette Backdrop */}
      <div className="absolute inset-0 bg-radial from-[#1A1610] via-[#0D0B08] to-[#050403] pointer-events-none" />

      {/* 
        The Exact Full Invitation Poster Card:
        - Perfectly constrained to aspect ratio 682:1024 so NOTHING is cropped
        - Fits cleanly on all viewports without overflow
      */}
      <div className="relative h-[100dvh] max-h-[100dvh] max-w-[100vw] w-auto aspect-[682/1024] flex items-center justify-center overflow-hidden">
        
        {/* Full Image with Ken Burns subtle entrance */}
        <motion.img
          initial={{ scale: 1.02, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src="/hero-invitation.png"
          alt="Sithumi & Asen Wedding Invitation"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
        />

        {/* Floating Ambient Gold Sparkles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.25, 0.75, 0.25],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full pointer-events-none z-10"
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
          Interactive Click Area for "JOIN OUR CELEBRATION" Button 
          - Positioned exactly over the button in the image (Y ~ 87.4%, Height ~ 4.4%, Width ~ 42%)
        */}
        <a
          href="#rsvp"
          onClick={handleRsvpClick}
          aria-label="Join our celebration RSVP"
          className="group absolute z-20 cursor-pointer rounded-full transition-all focus:outline-none"
          style={{
            top: '87.4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '42%',
            height: '4.4%',
          }}
        >
          {/* Subtle Hover / Active Gold Sheen */}
          <span className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#D4AF37]/25 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group-active:scale-95" />
        </a>

        {/* 
          Interactive Click Area for "SCROLL DOWN"
          - Positioned exactly over the scroll indicator (Y ~ 93.2%, Height ~ 3.8%, Width ~ 28%)
        */}
        <a
          href="#countdown"
          onClick={handleScrollClick}
          aria-label="Scroll down to wedding details"
          className="group absolute z-20 cursor-pointer rounded-xl transition-all focus:outline-none flex items-center justify-center"
          style={{
            top: '93.2%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '28%',
            height: '3.8%',
          }}
        >
          <span className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-active:scale-95" />
        </a>

      </div>
    </section>
  );
}
