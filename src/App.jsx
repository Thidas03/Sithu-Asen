import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import GuestWishes from './components/GuestWishes';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log("Audio play blocked by browser policy. User interaction required first.", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen bg-beige-light text-luxury-dark selection:bg-gold/30 selection:text-luxury-dark">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://archive.org/download/20-piano-guys-lord-of-the-rings-the-hobbit/20%20Piano%20Guys%20-%20Christina%20Perri%20-%20A%20Thousand%20Years.mp3"
        loop
      />

      {/* Floating Audio Controller */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-4 rounded-full bg-gold-gradient text-white shadow-xl hover:shadow-gold/30 cursor-pointer flex items-center justify-center border border-white/20 relative group"
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <>
              {/* Pulsing rings around the active music button */}
              <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping opacity-75" />
              <Volume2 className="w-5 h-5" />
            </>
          ) : (
            <VolumeX className="w-5 h-5 opacity-80" />
          )}

          {/* Floating Tooltip */}
          <span className="absolute right-14 bg-luxury-dark/95 text-white/90 text-[10px] tracking-widest uppercase py-1.5 px-3 rounded-lg border border-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            {isPlaying ? 'Mute Music' : 'Play Music'}
          </span>
        </motion.button>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />

        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVP />
        <GuestWishes />
      </main>

      {/* Footer */}
      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {/* Admin Panel Modal Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
