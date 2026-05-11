import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import ScrollReveal from '../shared/ScrollReveal';

const galleryItems = [
  { color: 'bg-sage/8', accent: 'sage', label: 'Haldi Ceremony', aspect: 'aspect-[3/4]' },
  { color: 'bg-rose/8', accent: 'rose', label: 'Ring Ceremony', aspect: 'aspect-square' },
  { color: 'bg-gold/5', accent: 'gold', label: 'Sangeet Night', aspect: 'aspect-[4/5]' },
  { color: 'bg-champagne', accent: 'sage', label: 'Wedding Day', aspect: 'aspect-[3/4]' },
  { color: 'bg-sage/5', accent: 'sage', label: 'Reception', aspect: 'aspect-square' },
  { color: 'bg-rose/5', accent: 'rose', label: 'Celebration', aspect: 'aspect-[4/5]' },
];

export default function Gallery() {
  const ref = useRef(null);

  return (
    <section ref={ref} id="gallery" className="section-padding bg-champagne relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20">
          <AnimatedText
            as="p"
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-light font-body font-light"
            delay={0.1}
          >
            Moments to Cherish
          </AnimatedText>

          <AnimatedText
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mt-4"
            delay={0.2}
          >
            A Glimpse of Our Celebrations
          </AnimatedText>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 lg:columns-3 gap-4 md:gap-6">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className="mb-4 md:mb-6 break-inside-avoid">
              <motion.div
                className={`${item.aspect} ${item.color} rounded-xl overflow-hidden relative group cursor-pointer`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Decorative monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/monogram.jpg"
                    alt=""
                    className="w-16 h-16 object-contain opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-700 rounded-full"
                  />
                </div>

                {/* Label overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6">
                  <p className="font-heading text-lg md:text-xl text-charcoal/60 group-hover:text-charcoal/80 transition-colors duration-500 font-light">
                    {item.label}
                  </p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-stone-light/50 font-body mt-1">
                    Photos coming soon
                  </p>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-ivory/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
