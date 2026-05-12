import { useEffect, useRef } from 'react';

function getTouchDistance(touches) {
  const firstTouch = touches[0];
  const secondTouch = touches[1];
  const xDistance = firstTouch.clientX - secondTouch.clientX;
  const yDistance = firstTouch.clientY - secondTouch.clientY;

  return Math.hypot(xDistance, yDistance);
}

function getVisualScale() {
  return window.visualViewport?.scale ?? 1;
}

function preventPinchOutRefresh() {
  let lastTouchDistance = null;

  function handleTouchMove(event) {
    if (event.touches.length < 2) {
      lastTouchDistance = null;
      return;
    }

    const currentTouchDistance = getTouchDistance(event.touches);
    const isPinchingClosed =
      lastTouchDistance !== null && currentTouchDistance < lastTouchDistance;

    lastTouchDistance = currentTouchDistance;

    if (getVisualScale() <= 1.02 && isPinchingClosed) {
      event.preventDefault();
    }
  }

  function handleTouchEnd() {
    lastTouchDistance = null;
  }

  function handleGestureChange(event) {
    if (getVisualScale() <= 1.02 && event.scale < 1) {
      event.preventDefault();
    }
  }

  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
  window.addEventListener('gesturechange', handleGestureChange, { passive: false });

  return () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);
    window.removeEventListener('gesturechange', handleGestureChange);
  };
}

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = '';
    }

    const cleanupPinchGuard = isTouchDevice ? preventPinchOutRefresh() : undefined;
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      cleanupPinchGuard?.();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return lenisRef;
}
