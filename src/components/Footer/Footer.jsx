import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { families } from '../../data/weddingData';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer ref={ref} id="footer" className="relative py-20 md:py-32 bg-champagne overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,166,90,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-2xl mx-auto text-center px-6 relative z-10">
        {/* Closing message */}
        <motion.p
          className="font-heading text-lg md:text-xl text-stone italic font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          With love and anticipation
        </motion.p>

        {/* Monogram */}
        <motion.div
          className="flex justify-center my-8 md:my-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/monogram.jpg"
            alt="S & D"
            className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-full monogram-glow"
          />
        </motion.div>

        {/* Names */}
        <motion.h2
          className="font-heading text-3xl md:text-4xl text-charcoal font-light tracking-[0.1em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Sasha <span className="text-gold italic">&</span> Dhruv
        </motion.h2>

        <motion.p
          className="mt-4 text-xs tracking-[0.3em] uppercase text-stone-light font-body font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          29 · 06 · 2026
        </motion.p>

        {/* Invitation from */}
        <motion.div
          className="mt-12 md:mt-16 pt-8 border-t border-stone-light/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-light font-body font-light mb-3">
            A cordial invitation from
          </p>
          <p className="font-heading text-base md:text-lg text-charcoal/70 font-light">
            {families.invitedBy}
          </p>
          <p className="font-heading text-sm text-stone-light font-light mt-1">
            {families.family}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
