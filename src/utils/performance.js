export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;

  const userAgent = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || '';

  return /android/i.test(userAgent) || /android/i.test(platform);
}

export function prefersLiteMotion() {
  if (typeof window === 'undefined') return false;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const deviceMemory = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : 8;
  const hardwareConcurrency =
    typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 8;

  return (
    reducedMotion ||
    isAndroidDevice() ||
    (coarsePointer && (deviceMemory <= 4 || hardwareConcurrency <= 4))
  );
}

export function applyDevicePerformanceClasses() {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const android = isAndroidDevice();

  root.classList.toggle('is-android', android);
  root.classList.toggle('is-lite-motion', prefersLiteMotion());
}
