import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-11-05T17:45:00+05:30').getTime(); // Colombo Time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section 
      id="countdown" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] text-luxury-dark"
    >
      {/* Subtle Botanical Floral Watermark Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236B5014' fill-rule='evenodd'%3E%3Cpath d='M60 20c-3-8-12-12-20-8-5 3-8 8-8 14 0 12 18 24 28 30 10-6 28-18 28-30 0-6-3-11-8-14-8-4-17 0-20 8z' opacity='0.7'/%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Warm Ambient Radial Highlights */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-3xl h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-3xl h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative hairline gold border frame */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 bottom-4 sm:bottom-8 border border-gold/20 rounded-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-2"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="w-8 h-[1px] bg-gold/40" />
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-dark font-medium">
              Anticipation
            </span>
            <span className="w-8 h-[1px] bg-gold/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-luxury-dark mb-4 sm:mb-6">
            Counting Down to the Big Day
          </h2>
          
          <p className="font-serif italic text-gold-dark text-base sm:text-lg md:text-xl font-normal mb-8 sm:mb-12 max-w-xl mx-auto px-4">
            "Every second brings us closer to the rest of our lives together."
          </p>
        </motion.div>

        {timeLeft.isExpired ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md border border-gold/40 px-8 py-6 rounded-2xl inline-block shadow-lg"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-gold-dark tracking-widest uppercase">
              The Big Day Has Arrived!
            </h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6 max-w-3xl mx-auto px-2 sm:px-4">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/85 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:border-gold transition-all duration-300"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(180, 150, 100, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Decorative Inner Inset Border */}
                <div className="absolute inset-1.5 sm:inset-2 border border-gold/15 group-hover:border-gold/30 transition-colors duration-300 rounded-xl pointer-events-none" />

                {/* Floating Micro Sparkle on Hover */}
                <Sparkles className="absolute top-2.5 right-2.5 w-3 h-3 text-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Number Display */}
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gold-dark my-0.5 sm:my-1">
                  {String(unit.value).padStart(2, '0')}
                </span>
                
                {/* Unit Label */}
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] text-luxury-charcoal/75 font-medium mt-1">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Date Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 sm:mt-12 flex flex-col items-center space-y-2"
        >
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[1px] bg-gold/40" />
            <Heart className="w-3.5 h-3.5 text-gold fill-gold/20" />
            <span className="w-6 h-[1px] bg-gold/40" />
          </div>
          <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.25em] text-luxury-charcoal/70 font-medium">
            Thursday, November 5, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
