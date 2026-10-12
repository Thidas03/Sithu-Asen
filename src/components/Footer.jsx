import React from 'react';
import { Heart } from 'lucide-react';
import MonogramSeal from './MonogramSeal';

export default function Footer({ onAdminClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F6F1EA] text-luxury-dark py-16 px-6 relative overflow-hidden border-t border-gold/30">
      {/* Decorative botanical watermark pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236B5014' fill-rule='evenodd'%3E%3Cpath d='M60 20c-3-8-12-12-20-8-5 3-8 8-8 14 0 12 18 24 28 30 10-6 28-18 28-30 0-6-3-11-8-14-8-4-17 0-20 8z' opacity='0.7'/%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-gold/60 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        
        {/* Monogram emblem from invitation cover (without wax seal) */}
        <MonogramSeal className="w-24 sm:w-28 my-1" initials="A&S" />

        {/* Wedding hashtag */}
        <div className="inline-flex items-center space-x-2 py-1.5 px-5 border border-gold/30 rounded-full bg-white/70 shadow-xs">
          <span className="font-cinzel text-[10px] md:text-xs tracking-widest text-gold-dark uppercase font-semibold">
            #SithumiAndAsen
          </span>
        </div>

        {/* Divider line */}
        <div className="w-16 h-[1px] bg-gold/30" />

        {/* Copyright info */}
        <div className="flex flex-col items-center space-y-2 text-luxury-charcoal/60 font-sans text-[10px] tracking-widest uppercase">
          <p className="flex items-center gap-1.5 font-medium">
            Made with <Heart className="w-3.5 h-3.5 text-gold fill-gold/30 animate-pulse" /> for Sithumi & Asen
          </p>
          <p className="flex flex-wrap justify-center items-center gap-2">
            <span>© {currentYear} • All Rights Reserved</span>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={onAdminClick} 
              className="hover:text-gold-dark transition-colors duration-300 cursor-pointer underline decoration-dotted underline-offset-4 lowercase text-luxury-charcoal/50 hover:underline-offset-2 hover:decoration-solid"
            >
              coordinator login
            </button>
          </p>
        </div>

      </div>
    </footer>
  );
}
