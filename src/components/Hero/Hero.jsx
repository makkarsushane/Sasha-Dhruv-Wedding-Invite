import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const nameVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory"
      style={{ opacity, scale }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(196,166,90,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Ambient floating elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/10"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      <motion.div className="relative z-10 text-center px-6" style={{ y }}>
        {/* Small monogram watermark above */}
        <motion.img
          src="/monogram.jpg"
          alt=""
          className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-8 opacity-25 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.25, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Overline */}
        <motion.p
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-stone font-body font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The wedding celebration of
        </motion.p>

        {/* Names */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-charcoal leading-none"
            custom={0}
            variants={nameVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Sasha
          </motion.h1>
        </div>

        <motion.div
          className="my-4 md:my-6 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="font-heading text-xl md:text-2xl italic text-gold/70 font-light">&</span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-charcoal leading-none"
            custom={1}
            variants={nameVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Dhruv
          </motion.h1>
        </div>

        {/* Date */}
        <motion.p
          className="mt-10 md:mt-14 text-sm md:text-base tracking-[0.35em] uppercase text-stone-light font-body font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          28 — 29 June 2026 · New Delhi
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-stone-light font-body">Scroll</p>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
