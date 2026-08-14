import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const targetDate = new Date('2026-11-05T10:00:00+05:30').getTime(); // Colombo Time
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

    calculateTimeLeft(); // initial run
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
      className="relative py-28 px-6 overflow-hidden flex items-center justify-center bg-luxury-dark text-white"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      
      {/* Heavy vignette/overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark/85 to-luxury-dark" />

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-gold/10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Anticipation</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">Counting Down to the Big Day</h2>
          <p className="font-serif italic text-gold text-lg md:text-xl font-light mb-12 max-w-xl mx-auto">
            "Every second brings us closer to the rest of our lives together."
          </p>
        </motion.div>

        {timeLeft.isExpired ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glassmorphism-dark border border-gold/30 px-12 py-8 rounded-2xl inline-block"
          >
            <h3 className="font-serif text-3xl text-gold tracking-widest uppercase">The Big Day Has Arrived!</h3>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glassmorphism-dark border border-gold/20 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center relative group hover:border-gold/50 transition-all duration-300 shadow-xl"
              >
                {/* Decorative sub-frame on hover */}
                <div className="absolute inset-2 border border-gold/5 group-hover:border-gold/20 transition-all duration-300 rounded-xl" />
                
                <span className="font-serif text-4xl md:text-5xl font-light tracking-wide text-gold mb-2">
                  {String(unit.value).padStart(2, '0')}
                </span>
                
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-beige/80">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-beige/60">
            Thursday, November 5, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
