import React, { useState, useRef } from 'react';
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
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleStartMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    if (audioRef.current && !isPlaying) {
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
          <InvitationCover 
            onOpen={handleOpenInvitation}
            onStartAudio={handleStartMusic}
            isPlaying={isPlaying}
            onToggleSound={handleToggleSound}
          />
        )}
      </AnimatePresence>

      {/* Floating Discreet Sound Control (Only when invitation is opened) */}
      {isInvitationOpen && (
        <button
          onClick={handleToggleSound}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black/85 text-gold border border-gold/40 shadow-xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer flex items-center justify-center group select-none"
        >
          {isPlaying ? (
            <div className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4 text-gold animate-pulse" />
              <span className="flex space-x-0.5 items-end h-2.5">
                <span className="w-0.5 h-2.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-gold/60" />
          )}
        </button>
      )}

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
