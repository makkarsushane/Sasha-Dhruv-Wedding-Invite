import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import ScrollReveal from '../shared/ScrollReveal';
import { venue } from '../../data/weddingData';

export default function Venue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="venue" className="section-padding bg-ivory relative overflow-hidden">
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(139,154,123,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section label */}
        <AnimatedText
          as="p"
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-light font-body font-light"
          delay={0.1}
        >
          The Venue
        </AnimatedText>

        {/* Venue name */}
        <AnimatedText
          as="h2"
          className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal font-light mt-6"
          delay={0.2}
        >
          {venue.name}
        </AnimatedText>

        <AnimatedText
          as="p"
          className="font-heading text-xl md:text-2xl text-sage font-light italic mt-2"
          delay={0.3}
        >
          {venue.hall}
        </AnimatedText>

        {/* Divider */}
        <motion.div
          className="mx-auto my-8 md:my-12 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Address card */}
        <ScrollReveal delay={0.4} className="w-full flex justify-center">
          <div className="glass rounded-2xl p-8 md:p-12 w-full max-w-md text-center">
            {/* Location icon */}
            <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>

            <p className="font-body text-sm md:text-base text-charcoal leading-relaxed font-light">
              {venue.address}
            </p>
            <p className="font-body text-sm md:text-base text-stone mt-1 font-light">
              {venue.city} — {venue.pincode}
            </p>

            {/* Get Directions button */}
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full border border-sage/30 text-sage hover:bg-sage hover:text-ivory transition-all duration-500 ease-out font-body text-xs tracking-[0.2em] uppercase group"
            >
              <span>Get Directions</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
