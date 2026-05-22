import { CLOUDINARY_CLOUD_NAME } from '@/config/site';

/**
 * Responsive images via Cloudinary.
 * Cloud name defaults in site config so Cloudflare builds work without dashboard env vars.
 */
export type ImageTransform = {
  width?: number;
  height?: number;
  crop?: 'limit' | 'fill' | 'fit' | 'scale';
  quality?: 'auto' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'avif';
  dpr?: 'auto' | number;
};

function cloudName(): string {
  return import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() || CLOUDINARY_CLOUD_NAME;
}

/** Only prepend when PUBLIC_CLOUDINARY_FOLDER is set */
function publicId(src: string): string {
  if (src.includes('/')) return src;
  const base = import.meta.env.PUBLIC_CLOUDINARY_FOLDER?.trim();
  return base ? `${base}/${src}` : src;
}

const LOCAL_IMAGE_PATTERN = /^(gallery-|hero-|category-|why-choose|cta-banner|testimonial-avatar)/;

export function isLocalImage(src: string): boolean {
  return LOCAL_IMAGE_PATTERN.test(src) || /\.(png|jpe?g|webp)$/i.test(src);
}

export function usesCloudinary(): boolean {
  return Boolean(cloudName());
}

export function usesCloudinaryForSrc(src: string): boolean {
  return usesCloudinary() && !isLocalImage(src);
}

export function responsiveWidths(intrinsicWidth: number, maxVariant = 1920): number[] {
  const steps = [320, 480, 640, 768, 1024, 1280, 1536, 1920];
  const cap = Math.min(intrinsicWidth, maxVariant);
  const picked = steps.filter((w) => w <= cap);
  if (picked.length === 0 || picked[picked.length - 1]! < cap) {
    picked.push(cap);
  }
  return [...new Set(picked)];
}

export function imageUrl(src: string, transform: ImageTransform = {}): string {
  if (src.startsWith('http') || src.startsWith('/')) return src;

  if (isLocalImage(src)) {
    return `/images/${src}`;
  }

  const cloud = cloudName();
  const parts: string[] = ['c_limit'];
  if (transform.width) parts.push(`w_${transform.width}`);
  if (transform.height) parts.push(`h_${transform.height}`);
  if (transform.crop && transform.crop !== 'limit') parts.push(`c_${transform.crop}`);
  parts.push(`q_${transform.quality ?? 'auto:good'}`, `f_${transform.format ?? 'auto'}`);
  if (transform.dpr) parts.push(`dpr_${transform.dpr}`);

  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join(',')}/${publicId(src)}`;
}

export function placeholderUrl(src: string): string | null {
  if (!usesCloudinaryForSrc(src)) return null;
  return `https://res.cloudinary.com/${cloudName()}/image/upload/c_limit,w_48,q_20,e_blur:800,f_auto/${publicId(src)}`;
}

export function srcSet(
  src: string,
  widths: number[],
  transform: Omit<ImageTransform, 'width'> = {},
): string {
  if (!usesCloudinaryForSrc(src)) return '';

  return widths
    .map((w) => `${imageUrl(src, { ...transform, width: w, dpr: 'auto' })} ${w}w`)
    .join(', ');
}
