import { useEffect, useRef } from 'react';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return lenisRef;
}
