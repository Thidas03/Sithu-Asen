import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Countdown', href: '#countdown' },
  { name: 'Details', href: '#details' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'RSVP', href: '#rsvp' },
  { name: 'Guestbook', href: '#wishes' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 glassmorphism border-b border-gold/20 shadow-md' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Initials */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-widest text-gold group-hover:text-gold-dark transition-colors duration-300">
              S & A
            </span>
            <Heart className="w-4 h-4 text-gold fill-gold/20 animate-pulse" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans text-xs uppercase tracking-widest hover:text-gold transition-colors duration-300 relative py-1 group ${
                  isScrolled ? 'text-luxury-dark' : 'text-white/90'
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="bg-gold-gradient hover:bg-gold-gradient-hover text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-full font-sans transition-all duration-300 shadow-md border border-gold/10 hover:shadow-gold/20 hover:scale-105 transform"
            >
              RSVP
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:text-gold transition-colors focus:outline-none ${
                isScrolled ? 'text-luxury-dark' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 lg:hidden glassmorphism flex flex-col items-center justify-start pt-12 space-y-6 overflow-y-auto pb-12 border-t border-gold/10"
          >
            {navItems.map((item) => (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-serif text-xl tracking-wider text-luxury-dark hover:text-gold transition-colors duration-300"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="bg-gold-gradient text-white text-sm uppercase tracking-widest px-8 py-3 rounded-full font-sans transition-transform duration-300 w-3/4 text-center shadow-lg"
            >
              RSVP Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
