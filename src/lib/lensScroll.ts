/** Shared shutter → works scroll timeline (keep ShutterTransition + WorksPreview in sync) */
export const LENS = {
  /** Iris blades → full circle (fast open) */
  OPEN_END: 0.3,
  /** Title fades in inside the circle */
  TITLE_IN: 0.3,
  TITLE_FULL: 0.36,
  /** Photos begin while title is still settling no dead gap */
  PHOTOS_START: 0.34,
  PHOTOS_END: 0.56,
  /** Iris dissolves as photos emerge */
  IRIS_FADE_START: 0.34,
  IRIS_FADE_END: 0.46,
} as const;

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** Smooth deceleration premium UI feel */
export const easeOut = (t: number) => 1 - (1 - t) ** 4;

/** Snappy settle for photo scale */
export const easePremium = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export function shutterProgress(section: HTMLElement): number {
  const rect = section.getBoundingClientRect();
  const range = section.offsetHeight - window.innerHeight;
  if (range <= 0) return 1;
  return clamp(-rect.top / range);
}

export function lensSegment(
  progress: number,
  start: number,
  end: number,
  ease: (t: number) => number = easeOut,
): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return ease((progress - start) / (end - start));
}
