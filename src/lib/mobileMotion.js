export function isTouchScrollDevice() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(pointer: coarse), (hover: none), (max-width: 767px)').matches;
}

export function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;

  const userAgentDataPlatform = navigator.userAgentData?.platform || '';
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const marker = `${userAgent} ${platform} ${userAgentDataPlatform}`;
  const isIos = /iphone|ipad|ipod/i.test(marker);

  return /android/i.test(marker) || (/linux/i.test(marker) && /mobile/i.test(marker) && !isIos);
}
