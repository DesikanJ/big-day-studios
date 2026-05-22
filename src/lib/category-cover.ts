import { getCategoryCoverSrc } from '@/data/galleries';
import { imageUrl, isLocalImage, usesCloudinary } from '@/lib/cloudinary';

/** Full URL for OG tags */
export function categoryCoverForOg(slug: string, siteOrigin: string): string {
  const src = getCategoryCoverSrc(slug);
  if (src.startsWith('http')) return src;
  if (usesCloudinary() && !isLocalImage(src)) {
    return imageUrl(src, { width: 1200, quality: 'auto:good' });
  }
  return new URL(`/images/${src.replace(/^\//, '')}`, siteOrigin).href;
}
