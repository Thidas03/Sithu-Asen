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
import InvitationCover from './components/InvitationCover';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleToggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio play error:", err);
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-beige-light text-luxury-dark selection:bg-gold/30 selection:text-luxury-dark">
      {/* Background Wedding Audio */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
        loop
        playsInline
      />

      {/* Royal "Open Invitation" Envelope Screen */}
      <AnimatePresence>
        {!isInvitationOpen && (
          <InvitationCover onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* Navigation with discreet header sound control */}
      <Navbar isPlaying={isPlaying} onToggleSound={handleToggleSound} />

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
