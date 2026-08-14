import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Users, GlassWater, CheckCircle, CalendarDays } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'attending',
    guests: '1',
    dietary: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitted(true);

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#AA8C2C', '#F3E7C4', '#1A1A1A', '#FFFFFF']
      });

      // Save to localStorage as a fallback backup database
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push({
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));
    } catch (err) {
      setFormError(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-6 bg-beige/40 relative overflow-hidden">
      {/* Decorative foliage or circular light overlay */}
      <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Response Requested</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">RSVP</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold/70">Kindly Reply By October 5, 2026</span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* Card Panel */}
        <div className="glassmorphism rounded-3xl p-8 md:p-12 border border-gold/15 shadow-xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {formError && (
                  <div className="bg-red-50 text-red-700 text-xs border border-red-200/50 p-4 rounded-xl font-sans">
                    {formError}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label className="block font-serif text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-sm text-luxury-dark placeholder-luxury-charcoal/40"
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gold/60" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block font-serif text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-sm text-luxury-dark placeholder-luxury-charcoal/40"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gold/60" />
                    </div>
                  </div>
                </div>

                {/* Attendance radio selection */}
                <div>
                  <label className="block font-serif text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-3">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.attendance === 'attending'
                          ? 'border-gold bg-gold/5 text-luxury-dark shadow-sm'
                          : 'border-gold/20 bg-white/30 text-luxury-charcoal/70 hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-serif text-sm tracking-wider">Joyfully Accept</span>
                    </label>
                    <label
                      className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.attendance === 'declined'
                          ? 'border-gold bg-gold/5 text-luxury-dark shadow-sm'
                          : 'border-gold/20 bg-white/30 text-luxury-charcoal/70 hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="declined"
                        checked={formData.attendance === 'declined'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-serif text-sm tracking-wider">Regretfully Decline</span>
                    </label>
                  </div>
                </div>

                {/* Additional attendees - only show if attending */}
                {formData.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <label className="block font-serif text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                      Number of Guests (Including You)
                    </label>
                    <div className="relative">
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-sm text-luxury-dark appearance-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                      </select>
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gold/60" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                        ▼
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Dietary requirements */}
                <div className="relative">
                  <label className="block font-serif text-xs font-semibold text-luxury-dark uppercase tracking-wider mb-2">
                    Dietary Requirements / Special Messages
                  </label>
                  <div className="relative">
                    <textarea
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g. Vegetarian, Allergies, or congratulations message..."
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors duration-300 font-sans text-sm text-luxury-dark placeholder-luxury-charcoal/40 resize-none"
                    />
                    <GlassWater className="absolute left-4 top-4 text-gold/60 w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-white py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Response'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 space-y-6"
              >
                <div className="inline-flex p-4 bg-gold/10 rounded-full text-gold">
                  <CheckCircle className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-light text-luxury-dark">Thank You!</h3>
                  <p className="font-sans text-sm text-luxury-charcoal/80 max-w-md mx-auto leading-relaxed">
                    {formData.attendance === 'attending'
                      ? `Your RSVP has been joyfully received. We cannot wait to celebrate with you and your ${formData.guests > 1 ? `${formData.guests - 1} guests` : 'party'} on November 5, 2026!`
                      : 'Thank you for letting us know. We will miss you, but we appreciate you sending your warm wishes!'}
                  </p>
                </div>

                {formData.attendance === 'attending' && (
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sithumi+%26+Asen%27s+Wedding&dates=20261105T043000Z/20261105T173000Z&details=Join+us+for+our+wedding+ceremony+and+reception+celebration+at+Galle+Face+Hotel!&location=Galle+Face+Hotel,+Colombo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-white border border-gold/30 hover:border-gold px-6 py-3 rounded-xl font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Add to Google Calendar</span>
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
