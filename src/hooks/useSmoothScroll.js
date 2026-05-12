import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isTouchDevice) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.86,
      autoResize: false,
    });

    lenisRef.current = lenis;
    let frameId;
    let resizeFrameId;
    let lastWindowWidth = window.innerWidth;

    lenis.on('scroll', ScrollTrigger.update);

    function handleResize() {
      const widthChanged = window.innerWidth !== lastWindowWidth;

      if (!widthChanged) return;

      lastWindowWidth = window.innerWidth;
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.update();
      });
    }

    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeFrameId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
