import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Calendar } from 'lucide-react';

const milestones = [
  {
    date: "September 15, 2021",
    title: "How We Met",
    description: "It began with a chance encounter at a quiet coastal gallery. A shared appreciation for fine art sparked a conversation that lasted until the gallery closed, and neither of us wanted the night to end.",
    icon: Sparkles,
  },
  {
    date: "November 6, 2021",
    title: "Our First Date",
    description: "Over candles and soft jazz at a hidden bistro, we talked for hours about everything and nothing. That night, walking under the autumn rain, we knew this was the start of a beautiful journey.",
    icon: Calendar,
  },
  {
    date: "December 24, 2024",
    title: "The Proposal",
    description: "On a snow-kissed balcony overlooking the city lights, Asen asked Sithumi to spend forever with him. Surrounded by candles and a million stars, she said the easiest 'Yes' of her life.",
    icon: Heart,
  },
  {
    date: "January 18, 2025",
    title: "The Engagement",
    description: "We celebrated our love and commitment with our closest family and friends in an intimate gold-themed garden dinner, setting the stage for our wedding day.",
    icon: Star,
  }
];

export default function StoryTimeline() {
  return (
    <section id="story" className="py-24 px-6 bg-beige-light relative overflow-hidden">
      {/* Decorative ornaments */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">Our Journey Together</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">Our Love Story</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="text-gold font-serif italic text-lg">Milestones</span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/50 via-gold/30 to-transparent -translate-x-1/2" />

          {/* Timeline Milestones */}
          <div className="space-y-16">
            {milestones.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={item.title} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Outer point on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-beige border border-gold flex items-center justify-center -translate-x-1/2 z-20 shadow-md">
                    <IconComponent className="w-3.5 h-3.5 text-gold" />
                  </div>

                  {/* Left Side Content (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-2 md:opacity-0 md:pointer-events-none hidden md:block'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="glassmorphism p-8 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <span className="font-sans text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">{item.date}</span>
                        <h3 className="font-serif text-2xl font-light text-luxury-dark mb-3">{item.title}</h3>
                        <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Content (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 md:text-left ${!isEven ? 'md:order-2' : 'md:order-1 md:opacity-0 md:pointer-events-none hidden md:block'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="glassmorphism p-8 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <span className="font-sans text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">{item.date}</span>
                        <h3 className="font-serif text-2xl font-light text-luxury-dark mb-3">{item.title}</h3>
                        <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Fallback for Mobile (so that both even and odd cards show up stacked on the right side) */}
                  <div className="w-full pl-12 md:hidden order-2">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="glassmorphism p-6 rounded-2xl border border-gold/10 shadow-sm"
                    >
                      <span className="font-sans text-xs uppercase tracking-widest text-gold font-semibold mb-2 block">{item.date}</span>
                      <h3 className="font-serif text-xl font-light text-luxury-dark mb-3">{item.title}</h3>
                      <p className="font-sans text-xs text-luxury-charcoal/80 leading-relaxed font-light">{item.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
