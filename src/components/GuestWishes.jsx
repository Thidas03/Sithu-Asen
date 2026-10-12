import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Send, Award } from 'lucide-react';

const isDummyWish = (wish) => {
  if (!wish || !wish.name || !wish.name.trim()) return true;
  if (wish.name === '__DELETED_WISH__') return true;
  const n = wish.name.trim().toLowerCase();
  const m = (wish.message || '').trim().toLowerCase();
  
  if (n === 'jim & pam' || n === 'jim and pam' || n === 'test welcomer') return true;
  if (m === 'so happy for you both! enjoy every moment of this magical journey.') return true;
  return false;
};

export default function GuestWishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDeletedIds = () => {
    try {
      const stored = localStorage.getItem('deleted_wish_ids');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const deduplicate = (list) => {
    const normalizeSender = (name) => {
      let clean = (name || '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
      if (clean.startsWith('tharushi')) return 'tharushi';
      return clean;
    };
    const seen = new Set();
    const result = [];
    for (const w of list) {
      const key = normalizeSender(w.name);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(w);
      }
    }
    return result;
  };

  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes');
      if (response.ok) {
        const data = await response.json();
        const deletedIds = getDeletedIds();
        const formatted = data
          .filter(wish => !isDummyWish(wish) && !deletedIds.includes(String(wish.id)))
          .map(wish => ({
            id: wish.id,
            name: wish.name,
            message: wish.message,
            date: new Date(wish.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }));
        setWishes(deduplicate(formatted));
      } else {
        loadFromLocalStorage();
      }
    } catch (err) {
      console.error('Error fetching wishes from API:', err);
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('wedding_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const deletedIds = getDeletedIds();
          const filtered = parsed.filter(w => !isDummyWish(w) && !deletedIds.includes(String(w.id)));
          const unique = deduplicate(filtered);
          setWishes(unique);
          localStorage.setItem('wedding_wishes', JSON.stringify(unique));
          return;
        }
      }
    } catch {
      // safe fallback
    }
    setWishes([]);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Please fill in both your name and message.');
      return;
    }

    setIsSubmitting(true);
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
      await fetchWishes();
    } catch (err) {
      console.error('Wish submission error:', err);
      setError(err.message || 'Failed to post message.');
    } finally {
      setIsSubmitting(false);
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
                  placeholder="Your Name"
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
                disabled={isSubmitting}
                className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-white py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold/25 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Message'}</span>
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
