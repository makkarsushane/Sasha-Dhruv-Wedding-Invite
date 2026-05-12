import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1,
      autoResize: true,
    });

    lenisRef.current = lenis;
    let frameId;
    let resizeFrameId;

    lenis.on('scroll', ScrollTrigger.update);

    function handleResize() {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        lenis.resize();
      });
    }

    window.addEventListener('resize', handleResize, { passive: true });

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeFrameId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
