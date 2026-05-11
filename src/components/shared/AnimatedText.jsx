import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  splitBy = 'none', // 'words', 'lines', 'none'
  animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'slideLeft', 'slideRight'
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
  };

  const variant = animations[animation] || animations.fadeUp;

  if (splitBy === 'words' && typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={variant.hidden}
            animate={isInView ? variant.visible : variant.hidden}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={variant.hidden}
      animate={isInView ? variant.visible : variant.hidden}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
