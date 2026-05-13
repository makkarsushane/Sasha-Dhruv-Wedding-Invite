import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import { families, blessings } from '../../data/weddingData';

export default function Story() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="story"
      className="relative section-padding bg-champagne overflow-hidden"
    >
      {/* Subtle background grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Sanskrit blessing */}
        <AnimatedText
          as="p"
          className="font-heading text-base md:text-lg text-sage leading-relaxed italic"
          animation="fadeIn"
          delay={0.2}
        >
          {blessings.sanskrit}
        </AnimatedText>

        <motion.div
          className="divider-line mx-auto my-8 md:my-12"
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Blessings heading */}
        <AnimatedText
          as="p"
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-stone font-body font-light"
          delay={0.5}
        >
          {blessings.english}
        </AnimatedText>

        {/* Grandparents */}
        <div className="mt-8 md:mt-12 space-y-2">
          {families.grandparents.map((gp, i) => (
            <AnimatedText
              key={i}
              as="p"
              className="font-heading text-lg md:text-xl text-charcoal font-light"
              delay={0.6 + i * 0.15}
            >
              {gp.names}
            </AnimatedText>
          ))}
        </div>

        <motion.div
          className="divider-line mx-auto my-10 md:my-14"
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Parents */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-8">
          {/* Bride's family */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-light font-body mb-4">
              Bride&apos;s Family
            </p>
            <p className="font-heading text-xl md:text-2xl text-charcoal font-light">
              {families.brideParents.mother}
            </p>
            <p className="font-heading text-lg md:text-xl text-stone mt-1 font-light italic">&</p>
            <p className="font-heading text-xl md:text-2xl text-charcoal font-light">
              {families.brideParents.father}
            </p>
            <p className="mt-4 text-xs text-stone-light font-body leading-relaxed max-w-xs mx-auto">
              request the honour of your gracious presence at the wedding ceremony of their daughter
            </p>
          </motion.div>

          {/* Groom's family */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-light font-body mb-4">
              Groom&apos;s Family
            </p>
            <p className="font-heading text-xl md:text-2xl text-charcoal font-light">
              {families.groomParents.mother}
            </p>
            <p className="font-heading text-lg md:text-xl text-stone mt-1 font-light italic">&</p>
            <p className="font-heading text-xl md:text-2xl text-charcoal font-light">
              {families.groomParents.father}
            </p>
            <p className="mt-4 text-xs text-stone-light font-body leading-relaxed max-w-xs mx-auto">
              with immense joy, invite you to celebrate the union of their son
            </p>
          </motion.div>
        </div>

        {/* Couple names */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal font-light">
            Dhruv
            <span className="text-gold mx-3 md:mx-4 italic text-3xl md:text-4xl">weds</span>
            Sasha
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
