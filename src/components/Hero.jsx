import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#couple');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-dark"
    >
      {/* Background Image with Ken Burns zoom effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 0.65 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-[center_15%]"
        style={{
          backgroundImage: `url('/hero.jpg')`,
        }}
      />

      {/* Elegant Dark Vignette/Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-luxury-dark/70" />



      {/* Main Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full"
      >
        {/* Save the Date badge */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6"
        >
          Save the Date
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl md:text-8xl font-light tracking-wide text-white leading-tight mb-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <span>Sithumi</span>
          <span className="text-gold font-serif italic text-4xl md:text-6xl font-normal">&</span>
          <span>Asen</span>
        </motion.h1>

        {/* Decorative divider line */}
        <motion.div
          variants={itemVariants}
          className="w-24 h-[1px] bg-gold my-4"
        />

        {/* Wedding details */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm md:text-lg tracking-[0.2em] text-beige/90 uppercase mb-8"
        >
          November 05, 2026 • Galle Face Hotel, Colombo
        </motion.p>

        {/* CTA Button */}
        <motion.a
          variants={itemVariants}
          href="#rsvp"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-transparent border border-gold hover:bg-gold hover:text-luxury-dark text-gold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full font-sans transition-all duration-500 shadow-md hover:shadow-gold/30 hover:scale-105 transform z-30"
        >
          Join Our Celebration
        </motion.a>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.2,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-10 z-20"
      >
        <a
          href="#couple"
          onClick={handleScrollClick}
          className="flex flex-col items-center text-beige/70 hover:text-gold transition-colors duration-300"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] mb-2">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-gold" />
        </a>
      </motion.div>
    </section>
  );
}
