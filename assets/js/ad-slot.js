import { siteConfig } from './data.js';

export function createAdSlot(position) {
  if (!siteConfig.ads.enabled) return null;
  const slot = document.createElement('div');
  slot.className = 'ad-slot';
  slot.dataset.position = position;
  slot.setAttribute('aria-label', 'Advertisement');
  return slot;
}
