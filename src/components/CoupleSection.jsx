import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CoupleSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { delay: 0.3, duration: 0.8 } 
    }
  };

  return (
    <section id="couple" className="py-24 px-6 bg-beige/40 relative overflow-hidden">
      {/* Decorative background details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gold/20" />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textVariants}
          className="mb-16"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Introducing The Happy Couple</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">Bride & Groom</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <Heart className="w-4 h-4 text-gold fill-gold/10" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-24 items-center">
          
          {/* Bride Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex flex-col items-center"
          >
            {/* Image Container with elegant gold borders */}
            <div className="relative group mb-8">
              <div className="absolute -inset-3 border border-gold/20 rounded-t-full transition-transform duration-500 group-hover:scale-102 group-hover:border-gold/40 pointer-events-none" />
              <div className="absolute -inset-1 border border-gold/40 rounded-t-full transition-transform duration-500 group-hover:scale-[1.01] pointer-events-none" />
              <div className="w-64 h-96 md:w-72 md:h-[420px] rounded-t-full overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1591555200985-0551756cfbfb?auto=format&fit=crop&w=800&q=80"
                  alt="Sithumi - The Bride"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-luxury-dark/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            
            {/* Bride Details */}
            <h3 className="font-serif text-3xl font-light text-luxury-dark mb-2">Sithumi</h3>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 block">The Bride</span>
            <p className="font-sans text-sm text-luxury-charcoal/80 max-w-sm leading-relaxed text-center font-light italic">
              "Love is not finding someone to live with; it's finding someone you can't live without. Asen has been my anchor, my joy, and my greatest adventure."
            </p>
          </motion.div>

          {/* Groom Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            className="flex flex-col items-center"
          >
            {/* Image Container with elegant gold borders */}
            <div className="relative group mb-8">
              <div className="absolute -inset-3 border border-gold/20 rounded-t-full transition-transform duration-500 group-hover:scale-102 group-hover:border-gold/40 pointer-events-none" />
              <div className="absolute -inset-1 border border-gold/40 rounded-t-full transition-transform duration-500 group-hover:scale-[1.01] pointer-events-none" />
              <div className="w-64 h-96 md:w-72 md:h-[420px] rounded-t-full overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Asen - The Groom"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-luxury-dark/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            
            {/* Groom Details */}
            <h3 className="font-serif text-3xl font-light text-luxury-dark mb-2">Asen</h3>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 block">The Groom</span>
            <p className="font-sans text-sm text-luxury-charcoal/80 max-w-sm leading-relaxed text-center font-light italic">
              "From the moment I met Sithumi, I knew our lives would be beautifully intertwined forever. I cannot wait to stand by her side and begin our forever."
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
