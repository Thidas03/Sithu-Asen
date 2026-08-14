import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ onAdminClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-white py-16 px-6 relative overflow-hidden border-t border-gold/15">
      {/* Decorative details */}
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80')"
        }}
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        
        {/* Monogram logo */}
        <div className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-gold select-none">
          S & A
        </div>

        {/* Closing Quote */}
        <p className="font-serif italic text-beige/80 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          "Two souls with but a single thought, two hearts that beat as one."
        </p>

        {/* Wedding hashtag */}
        <div className="inline-flex items-center space-x-2 py-1 px-4 border border-gold/20 rounded-full bg-white/[0.02]">
          <span className="font-sans text-[10px] md:text-xs tracking-widest text-gold uppercase">
            #SithumiAndAsen
          </span>
        </div>

        {/* Divider line */}
        <div className="w-16 h-[1px] bg-gold/25" />

        {/* Copyright info */}
        <div className="flex flex-col items-center space-y-2 text-white/40 font-sans text-[10px] tracking-widest uppercase">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-gold fill-gold/20 animate-pulse" /> for Sithumi & Asen
          </p>
          <p className="flex flex-wrap justify-center items-center gap-2">
            <span>© {currentYear} • All Rights Reserved</span>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={onAdminClick} 
              className="hover:text-gold transition-colors duration-300 cursor-pointer underline decoration-dotted underline-offset-4 lowercase text-white/30 hover:underline-offset-2 hover:decoration-solid"
            >
              coordinator login
            </button>
          </p>
        </div>

      </div>
    </footer>
  );
}
