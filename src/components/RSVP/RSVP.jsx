import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';

export default function RSVP() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} id="rsvp" className="section-padding bg-ivory relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(212,160,160,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <AnimatedText
          as="p"
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-light font-body font-light"
          delay={0.1}
        >
          We await your presence
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mt-4"
          delay={0.2}
        >
          Kindly Respond
        </AnimatedText>

        <motion.div
          className="mx-auto mt-6 mb-12 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Name */}
              <div className="relative pt-5">
                <label
                  className={`absolute left-0 font-body text-sm transition-all duration-300 pointer-events-none ${
                    focused === 'name' || formData.name
                      ? 'text-[10px] top-0 tracking-[0.2em] uppercase text-sage'
                      : 'top-7 text-stone-light'
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  required
                  className="w-full bg-transparent border-b border-stone-light/30 focus:border-sage py-2 text-charcoal font-body text-sm font-light outline-none transition-colors duration-300"
                />
              </div>

              {/* Number of guests */}
              <div className="relative pt-5">
                <label className="absolute left-0 top-0 text-[10px] tracking-[0.2em] uppercase text-sage font-body pointer-events-none">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-light/30 focus:border-sage py-2 text-charcoal font-body text-sm font-light outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-0 bottom-3 w-3.5 h-3.5 text-stone-light pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              {/* Message */}
              <div className="relative pt-5">
                <label
                  className={`absolute left-0 font-body text-sm transition-all duration-300 pointer-events-none ${
                    focused === 'message' || formData.message
                      ? 'text-[10px] top-0 tracking-[0.2em] uppercase text-sage'
                      : 'top-7 text-stone-light'
                  }`}
                >
                  A Note for the Couple
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  rows="3"
                  className="w-full bg-transparent border-b border-stone-light/30 focus:border-sage py-2 text-charcoal font-body text-sm font-light outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="mt-4 px-10 py-3.5 rounded-full bg-sage text-ivory font-body text-xs tracking-[0.25em] uppercase hover:bg-sage-dark transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send RSVP
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="/monogram.jpg"
                alt="S&D"
                className="w-20 h-20 object-contain mx-auto mb-6 rounded-full monogram-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <h3 className="font-heading text-2xl md:text-3xl text-charcoal font-light">
                Thank You
              </h3>
              <p className="mt-3 font-body text-sm text-stone font-light">
                Your response has been noted. We look forward to celebrating with you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
