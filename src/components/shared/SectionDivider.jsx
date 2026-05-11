import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionDivider({ className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center justify-center gap-6 py-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-gold/30"
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.img
        src="/monogram.jpg"
        alt="S&D"
        className="w-10 h-10 object-contain rounded-full opacity-40"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.4 } : { scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="h-px bg-gradient-to-l from-transparent to-gold/30"
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
