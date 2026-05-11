import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import EventCard from './EventCard';
import SectionDivider from '../shared/SectionDivider';
import AnimatedText from '../shared/AnimatedText';
import { events } from '../../data/weddingData';

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="events" className="relative overflow-hidden">
      {events.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className={`section-padding ${dayIndex === 0 ? 'bg-ivory' : 'bg-champagne'}`}
        >
          <div className="max-w-3xl mx-auto">
            {/* Day header */}
            <div className="text-center mb-12 md:mb-16">
              <AnimatedText
                as="p"
                className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-light font-body font-light"
                delay={0.1}
              >
                {day.day}
              </AnimatedText>

              <AnimatedText
                as="h2"
                className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mt-4"
                delay={0.2}
              >
                {day.date}
              </AnimatedText>

              <motion.div
                className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 100 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Event cards */}
            {day.celebrations.map((event, eventIndex) => (
              <EventCard
                key={eventIndex}
                event={event}
                index={eventIndex}
                isLast={eventIndex === day.celebrations.length - 1}
              />
            ))}
          </div>

          {/* Divider between days */}
          {dayIndex < events.length - 1 && <SectionDivider className="mt-8" />}
        </div>
      ))}
    </section>
  );
}
