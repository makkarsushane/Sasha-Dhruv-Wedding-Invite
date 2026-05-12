import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: isTouchDevice ? 1.12 : 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isTouchDevice,
      syncTouch: isTouchDevice,
      syncTouchLerp: 0.055,
      touchInertiaExponent: 1.18,
      wheelMultiplier: 0.86,
      touchMultiplier: isTouchDevice ? 0.58 : 1,
      autoResize: false,
    });

    lenisRef.current = lenis;
    let frameId;
    let resizeFrameId;
    let lastWindowWidth = window.innerWidth;

    lenis.on('scroll', ScrollTrigger.update);

    function isPinchZooming() {
      return window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01;
    }

    function handleResize() {
      const widthChanged = window.innerWidth !== lastWindowWidth;

      if (isTouchDevice && (!widthChanged || isPinchZooming())) return;

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
