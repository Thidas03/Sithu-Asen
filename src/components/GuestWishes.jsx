import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Send, Award } from 'lucide-react';

const defaultWishes = [
  {
    id: 1,
    name: "Uncle Nimal & Aunty Sunila",
    message: "Wishing you both a lifetime of love, laughter, and endless happiness! Sithumi, you make a breathtaking bride. Asen, welcome to the family!",
    date: "June 20, 2026",
  },
  {
    id: 2,
    name: "Ruwan & Tharushi",
    message: "So thrilled to be part of your beautiful day! Watching your love story grow has been a privilege. Cheers to this new chapter!",
    date: "June 22, 2026",
  },
  {
    id: 3,
    name: "Dr. K. Perera",
    message: "Congratulations on taking this beautiful step together. May your home be filled with peace, understanding, and joy always.",
    date: "June 24, 2026",
  }
];

export default function GuestWishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes');
      if (response.ok) {
        const data = await response.json();
        const formatted = data.map(wish => ({
          id: wish.id,
          name: wish.name,
          message: wish.message,
          date: new Date(wish.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        }));
        setWishes(formatted.length > 0 ? formatted : defaultWishes);
      } else {
        loadFromLocalStorage();
      }
    } catch (err) {
      console.error('Error fetching wishes from API:', err);
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      setWishes(defaultWishes);
      localStorage.setItem('wedding_wishes', JSON.stringify(defaultWishes));
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both your name and message.');
      return;
    }

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post message.');
      }

      setName('');
      setMessage('');
      fetchWishes();
    } catch (err) {
      console.warn('API post failed, falling back to local storage:', err);
      
      const newWish = {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));

      setName('');
      setMessage('');
    }
  };

  return (
    <section id="wishes" className="py-24 px-6 bg-beige-light relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-[10%] w-[1px] h-20 bg-gold/25" />
      <div className="absolute bottom-0 left-[20%] w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Share Your Blessings</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">Guest Book</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <MessageSquareQuote className="w-4 h-4 text-gold" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* Two Column Layout: Write & Read */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Write Wish Column */}
          <div className="lg:col-span-1 glassmorphism border border-gold/15 p-6 rounded-2xl shadow-lg">
            <h3 className="font-serif text-2xl font-light text-luxury-dark mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              <span>Send Wishes</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200/50 font-sans">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-serif text-[10px] md:text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aunty Priya"
                  className="w-full px-4 py-2.5 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-xs md:text-sm text-luxury-dark placeholder-luxury-charcoal/40"
                />
              </div>

              <div>
                <label className="block font-serif text-[10px] md:text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                  Your Blessings
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="May your love blossom forever..."
                  className="w-full px-4 py-2.5 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-xs md:text-sm text-luxury-dark placeholder-luxury-charcoal/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-white py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold/25 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Message</span>
              </button>
            </form>
          </div>

          {/* List Wishes Column */}
          <div className="lg:col-span-2 space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scroll border-t lg:border-t-0 border-gold/10 pt-8 lg:pt-0">
            <AnimatePresence initial={false}>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glassmorphism border border-gold/10 hover:border-gold/25 p-6 rounded-2xl shadow-sm transition-all duration-300 relative group"
                >
                  {/* Small gold quote detail */}
                  <span className="absolute right-6 top-6 text-gold/10 group-hover:text-gold/25 transition-colors font-serif text-6xl pointer-events-none select-none">
                    ”
                  </span>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-serif text-lg text-luxury-dark tracking-wide font-normal">
                      {wish.name}
                    </h4>
                    <span className="font-sans text-[10px] text-luxury-charcoal/50 uppercase tracking-wider">
                      {wish.date}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light italic">
                    "{wish.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {wishes.length === 0 && (
              <p className="text-center font-sans text-xs text-luxury-charcoal/60 py-8">
                Be the first to send wishes to Sithumi & Asen!
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
