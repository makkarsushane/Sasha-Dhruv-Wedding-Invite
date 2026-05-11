import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EventCard({ event, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Only show significant events (skip standalone lunch/dinner entries)
  const isMinor = !event.description && (event.name === 'Lunch' || event.name === 'Dinner');

  return (
    <motion.div
      ref={ref}
      className={`relative ${isMinor ? 'py-3' : 'py-8 md:py-10'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {isMinor ? (
        /* Compact style for minor events */
        <div className="flex items-center justify-between max-w-lg mx-auto text-stone-light">
          <span className="font-body text-xs tracking-[0.15em] uppercase">{event.name}</span>
          <span className="h-px flex-1 mx-4 bg-stone-light/20" />
          <span className="font-body text-xs tracking-[0.1em]">{event.time}</span>
        </div>
      ) : (
        /* Full card for major events */
        <div className="max-w-lg mx-auto text-center">
          {/* Event name */}
          <h3 className="font-heading text-2xl md:text-3xl text-charcoal font-light">
            {event.name}
          </h3>

          {/* Time */}
          <p className="mt-3 font-body text-sm md:text-base text-gold tracking-[0.1em] font-light">
            {event.time}
          </p>

          {/* Description */}
          {event.description && (
            <p className="mt-4 font-body text-sm text-stone font-light leading-relaxed max-w-md mx-auto">
              {event.description}
            </p>
          )}

          {/* Venue & Attire */}
          <div className="mt-5 flex items-center justify-center gap-6 flex-wrap">
            {event.venue && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="font-body text-xs tracking-[0.1em] text-stone uppercase">{event.venue}</span>
              </div>
            )}
            {event.attire && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <span className="font-body text-xs tracking-[0.1em] text-stone italic">{event.attire}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Separator */}
      {!isLast && !isMinor && (
        <motion.div
          className="mx-auto mt-8 md:mt-10 h-px w-16 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}
    </motion.div>
  );
}
