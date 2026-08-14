import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Compass } from 'lucide-react';

const events = [
  {
    type: "Poruwa Ceremony",
    date: "Thursday, November 5, 2026",
    time: "10:00 AM - 12:00 PM",
    venue: "The Lawn (Outdoor), Galle Face Hotel",
    address: "2 Galle Road, Colombo 00300",
    mapUrl: "https://maps.google.com/?q=Galle+Face+Hotel+Colombo+Lawn",
    bgImage: "/poruwa.png",
  },
  {
    type: "The Reception",
    date: "Thursday, November 5, 2026",
    time: "6:00 PM - 11:00 PM",
    venue: "Jubilee Ballroom, Galle Face Hotel",
    address: "2 Galle Road, Colombo 00300",
    mapUrl: "https://maps.google.com/?q=Galle+Face+Hotel+Colombo+Jubilee+Ballroom",
    bgImage: "/galleface.jpg",
  }
];

export default function EventDetails() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section id="details" className="py-24 px-6 bg-beige/30 relative overflow-hidden">
      {/* Background elegant circle overlay */}
      <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section title */}
        <div className="text-center mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold block mb-3">When & Where</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-dark mb-4">Event Details</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <Compass className="w-4 h-4 text-gold" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* Details Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.type}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="glassmorphism rounded-3xl overflow-hidden border border-gold/15 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Event Image Banner with Overlay */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={event.bgImage}
                  alt={event.type}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beige-light via-luxury-dark/30 to-luxury-dark/50" />
                <div className="absolute bottom-6 left-8">
                  <h3 className="font-serif text-3xl font-light text-white drop-shadow-md group-hover:text-gold-light transition-colors duration-300">
                    {event.type}
                  </h3>
                </div>
              </div>

              {/* Event Text Info */}
              <div className="p-8 space-y-6 flex-grow">
                {/* Date */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0 mt-0.5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold tracking-wide text-luxury-dark">Date</h4>
                    <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 font-light mt-0.5">{event.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold tracking-wide text-luxury-dark">Time</h4>
                    <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 font-light mt-0.5">{event.time}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold tracking-wide text-luxury-dark">{event.venue}</h4>
                    <p className="font-sans text-xs md:text-sm text-luxury-charcoal/80 font-light mt-0.5">{event.address}</p>
                  </div>
                </div>


              </div>

              {/* Action Button at bottom of card */}
              <div className="p-8 pt-0">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-gold/40 hover:border-gold bg-transparent text-gold hover:text-luxury-dark hover:bg-gold transition-all duration-300 font-sans text-xs uppercase tracking-widest"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
