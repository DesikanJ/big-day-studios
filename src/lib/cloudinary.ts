/**
 * Responsive images via Cloudinary (recommended for production).
 * - f_auto: AVIF/WebP/JPEG per browser
 * - q_auto:good: sharp but smaller files
 * - c_limit: never upscale past original
 * - dpr_auto: retina without shipping huge files to 1x screens
 */
export type ImageTransform = {
  width?: number;
  height?: number;
  crop?: 'limit' | 'fill' | 'fit' | 'scale';
  quality?: 'auto' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'avif';
  dpr?: 'auto' | number;
};

export function usesCloudinary(): boolean {
  return Boolean(import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME);
}

function cloudName(): string | undefined {
  return import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
}

function folder(): string {
  return import.meta.env.PUBLIC_CLOUDINARY_FOLDER ?? 'big-day';
}

function publicId(src: string): string {
  return src.includes('/') ? src : `${folder()}/${src}`;
}

/** Width steps tuned for phones → desktop (avoid 20+ variants). */
export function responsiveWidths(
  intrinsicWidth: number,
  maxVariant = 1920,
): number[] {
  const steps = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
  const cap = Math.min(intrinsicWidth, maxVariant);
  const picked = steps.filter((w) => w <= cap);
  if (picked.length === 0 || picked[picked.length - 1]! < cap) {
    picked.push(cap);
  }
  return [...new Set(picked)];
}

export function imageUrl(src: string, transform: ImageTransform = {}): string {
  const cloud = cloudName();

  if (!cloud || src.startsWith('http') || src.startsWith('/')) {
    if (src.startsWith('http') || src.startsWith('/')) return src;
    return `/images/${src}`;
  }

  const parts: string[] = ['c_limit'];
  if (transform.width) parts.push(`w_${transform.width}`);
  if (transform.height) parts.push(`h_${transform.height}`);
  if (transform.crop && transform.crop !== 'limit') parts.push(`c_${transform.crop}`);
  parts.push(`q_${transform.quality ?? 'auto:good'}`, `f_${transform.format ?? 'auto'}`);
  if (transform.dpr) parts.push(`dpr_${transform.dpr}`);

  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join(',')}/${publicId(src)}`;
}

/** Tiny blurred image for instant placeholder while full file loads. */
export function placeholderUrl(src: string): string | null {
  if (!usesCloudinary()) return null;
  const cloud = cloudName();
  return `https://res.cloudinary.com/${cloud}/image/upload/c_limit,w_48,q_20,e_blur:800,f_auto/${publicId(src)}`;
}

export function srcSet(
  src: string,
  widths: number[],
  transform: Omit<ImageTransform, 'width'> = {},
): string {
  if (!usesCloudinary()) return '';

  return widths
    .map((w) => `${imageUrl(src, { ...transform, width: w, dpr: 'auto' })} ${w}w`)
    .join(', ');
}
