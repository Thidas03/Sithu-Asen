import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import GuestWishes from './components/GuestWishes';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { Music } from 'lucide-react';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasStarted = false;

    const startAudio = () => {
      if (hasStarted) return;
      audio.play().then(() => {
        hasStarted = true;
        setIsPlaying(true);
        setShowMusicPrompt(false);
        // Remove listeners once playback has successfully started
        interactionEvents.forEach(e => window.removeEventListener(e, startAudio));
      }).catch(() => {
        // Autoplay was blocked by browser policy (common on mobile phones)
        setShowMusicPrompt(true);
      });
    };

    // 1. Attempt immediate autoplay
    startAudio();

    // 2. Fallback: Listen to all user gestures (tap, touch, scroll, click)
    const interactionEvents = ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll'];
    interactionEvents.forEach(e => {
      window.addEventListener(e, startAudio, { passive: true });
    });

    // Check after 2 seconds if still blocked, ensure prompt appears
    const timer = setTimeout(() => {
      if (!hasStarted && audio.paused) {
        setShowMusicPrompt(true);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      interactionEvents.forEach(e => {
        window.removeEventListener(e, startAudio);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-beige-light text-luxury-dark selection:bg-gold/30 selection:text-luxury-dark">
      {/* Background Audio - locally hosted from Vercel CDN for instant zero-lag playback */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
        autoPlay
        loop
        playsInline
      />

      {/* Subtle Mobile Autoplay Unlock Banner (only shows if mobile phone blocks audio until first tap) */}
      <AnimatePresence>
        {showMusicPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                  setShowMusicPrompt(false);
                });
              }
            }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-luxury-dark/90 backdrop-blur-md border border-gold/40 text-gold-light shadow-2xl flex items-center space-x-2 text-xs font-sans tracking-widest uppercase cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-gold animate-bounce" />
            <span>Tap anywhere for music</span>
          </motion.div>
        )}
      </AnimatePresence>

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
