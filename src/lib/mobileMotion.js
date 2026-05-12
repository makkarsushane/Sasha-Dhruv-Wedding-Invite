export function isTouchScrollDevice() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(pointer: coarse), (hover: none), (max-width: 767px)').matches;
}
