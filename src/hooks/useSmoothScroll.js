'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchScrollDevice } from '../lib/mobileMotion';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isTouchScrollDevice()) {
      let frameId = 0;

      const updateScrollTrigger = () => {
        frameId = 0;
        ScrollTrigger.update();
      };

      const handleScroll = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(updateScrollTrigger);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (frameId) window.cancelAnimationFrame(frameId);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return lenisRef;
}
