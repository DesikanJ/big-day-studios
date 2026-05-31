/** Scroll-driven gallery reveal + parallax (lerp-smoothed) */

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeReveal = (t: number) => (t >= 1 ? 1 : 1 - (1 - t) ** 3);

/** 0 → 1 as item enters viewport from below */
export function revealTarget(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const probe = rect.top + rect.height * 0.38;
  const start = vh * 0.94;
  const end = vh * 0.52;
  if (probe >= start) return 0;
  if (probe <= end) return 1;
  return easeReveal(1 - (probe - end) / (start - end));
}

/** Subtle Y shift for inner image while scrolling */
export function parallaxTarget(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const center = rect.top + rect.height * 0.5;
  const norm = (center - window.innerHeight * 0.5) / window.innerHeight;
  return norm * -32;
}
