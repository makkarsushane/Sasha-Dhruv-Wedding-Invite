import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { prefersLiteMotion } from '../../utils/performance';

const loaderPetals = [
  { left: '16%', top: '22%', delay: 0.1 },
  { left: '72%', top: '18%', delay: 0.5 },
  { left: '82%', top: '58%', delay: 0.9 },
  { left: '24%', top: '72%', delay: 1.2 },
  { left: '51%', top: '14%', delay: 1.6 },
  { left: '62%', top: '78%', delay: 2 },
];

const monogramUrl = `${import.meta.env.BASE_URL}monogram.jpg`;

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const completedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const liteMotion = reducedMotion || prefersLiteMotion();
  const timings = liteMotion
    ? { phaseOne: 180, phaseTwo: 560, phaseThree: 980, phaseFour: 1450, finish: 2600 }
    : { phaseOne: 280, phaseTwo: 1250, phaseThree: 2450, phaseFour: 4300, finish: 5100 };

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase(5);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), timings.phaseOne),
      setTimeout(() => setPhase(2), timings.phaseTwo),
      setTimeout(() => setPhase(3), timings.phaseThree),
      setTimeout(() => setPhase(4), timings.phaseFour),
      setTimeout(finish, timings.finish),
    ];
    return () => timers.forEach(clearTimeout);
  }, [finish, timings.finish, timings.phaseFour, timings.phaseOne, timings.phaseThree, timings.phaseTwo]);

  const handleSkip = () => {
    finish();
  };

  const emblemVisible = liteMotion ? phase >= 1 : phase >= 2;
  const copyVisible = liteMotion ? phase >= 2 : phase >= 3;
  const exitDuration = liteMotion ? 0.28 : 0.75;

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          className="opening-loader"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: exitDuration, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Opening invitation"
        >
          <div className="loader-grain" aria-hidden="true" />
          <motion.div
            className="loader-wash wash-one"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.9 }}
            transition={{ duration: liteMotion ? 0.42 : 1.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="loader-wash wash-two"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 1.08 }}
            transition={{ duration: liteMotion ? 0.42 : 2.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          {!liteMotion && (
            <div className="loader-petal-field" aria-hidden="true">
              {loaderPetals.map((petal, index) => (
                <motion.span
                  key={index}
                  className="loader-petal"
                  style={{ left: petal.left, top: petal.top }}
                  initial={{ opacity: 0, y: 18, rotate: -8 }}
                  animate={{
                    opacity: phase >= 2 ? [0, 0.75, 0.35] : 0,
                    y: phase >= 2 ? [18, -14, -28] : 18,
                    rotate: phase >= 2 ? [-8, 8, -4] : -8,
                  }}
                  transition={{
                    delay: petal.delay,
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}

          <div className="loader-stage">
            <div className="loader-emblem">
              <motion.svg
                className="loader-strokes"
                viewBox="0 0 260 260"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: liteMotion ? 0.2 : 0.35 }}
                aria-hidden="true"
              >
                <motion.circle
                  cx="130"
                  cy="130"
                  r="114"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeDasharray="716"
                  initial={liteMotion ? false : { strokeDashoffset: 716 }}
                  animate={{ strokeDashoffset: phase >= 1 || liteMotion ? 0 : 716 }}
                  transition={{ duration: liteMotion ? 0.01 : 2.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx="130"
                  cy="130"
                  r="96"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  strokeDasharray="604"
                  initial={liteMotion ? false : { strokeDashoffset: -604 }}
                  animate={{ strokeDashoffset: phase >= 1 || liteMotion ? 0 : -604 }}
                  transition={{
                    duration: liteMotion ? 0.01 : 2.4,
                    delay: liteMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.path
                  d="M130 26 C152 65 195 76 234 54 C212 93 223 136 260 158 C216 159 188 190 184 234 C162 196 98 196 76 234 C72 190 44 159 0 158 C37 136 48 93 26 54 C65 76 108 65 130 26Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  strokeDasharray="900"
                  initial={liteMotion ? false : { strokeDashoffset: 900 }}
                  animate={{ strokeDashoffset: emblemVisible ? 0 : 900 }}
                  transition={{ duration: liteMotion ? 0.01 : 2.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.svg>

              <motion.img
                src={monogramUrl}
                alt="Sasha and Dhruv monogram"
                className="loader-monogram"
                width="1280"
                height="1280"
                decoding="async"
                fetchPriority="high"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: emblemVisible ? 1 : 0,
                  scale: emblemVisible ? 1 : 1.1,
                }}
                transition={{ duration: liteMotion ? 0.35 : 1.4, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.div
                className="loader-light"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: emblemVisible ? 0.85 : 0,
                  scale: emblemVisible ? 1 : 0.6,
                }}
                transition={{ duration: liteMotion ? 0.35 : 1.8, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
            </div>

            <motion.div
              className="loader-copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{
                opacity: copyVisible ? 1 : 0,
                y: copyVisible ? 0 : 20,
              }}
              transition={{ duration: liteMotion ? 0.35 : 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>A wedding invitation</p>
              <h1>Sasha weds Dhruv</h1>
              <span>28 - 29 June 2026</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
