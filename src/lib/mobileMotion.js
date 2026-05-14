export function isTouchScrollDevice() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(pointer: coarse), (hover: none), (max-width: 767px)').matches;
}

export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;

  const userAgentDataPlatform = navigator.userAgentData?.platform || '';
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';

  return /android/i.test(`${userAgent} ${platform} ${userAgentDataPlatform}`);
}
