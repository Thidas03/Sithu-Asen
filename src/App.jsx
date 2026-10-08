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
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Handled gracefully until first interaction
        });
      }
    };

    // Attempt autoplay immediately on load
    playAudio();

    // Handle mobile/browser autoplay policies: plays on first tap, click, or scroll
    const onUserInteraction = () => {
      playAudio();
    };

    window.addEventListener('click', onUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });
    window.addEventListener('scroll', onUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onUserInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-beige-light text-luxury-dark selection:bg-gold/30 selection:text-luxury-dark">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://archive.org/download/20-piano-guys-lord-of-the-rings-the-hobbit/20%20Piano%20Guys%20-%20Christina%20Perri%20-%20A%20Thousand%20Years.mp3"
        autoPlay
        loop
        playsInline
      />

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
