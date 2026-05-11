import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Family', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Venue', href: '#venue' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navigation({ visible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 200);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="glass rounded-full px-8 py-3 flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-[10px] tracking-[0.25em] uppercase text-stone hover:text-charcoal transition-colors duration-300 font-body font-light"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile nav button */}
      <motion.button
        className="fixed top-5 right-5 z-50 md:hidden w-10 h-10 glass rounded-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hidden && !isOpen ? 0 : 1 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-4 flex flex-col gap-1">
          <motion.span className="h-px bg-charcoal block" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3 : 0 }} transition={{ duration: 0.3 }} />
          <motion.span className="h-px bg-charcoal block" animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="h-px bg-charcoal block" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3 : 0 }} transition={{ duration: 0.3 }} />
        </div>
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory/95 backdrop-blur-lg flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="font-heading text-2xl text-charcoal font-light tracking-[0.1em] hover:text-sage transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
