import { getCategoryCoverSrc } from '@/data/galleries';
import { imageUrl } from '@/lib/cloudinary';

/** Full URL for OG tags; path or Cloudinary id for <img> via OptimizedImage */
export function categoryCoverForOg(slug: string, siteOrigin: string): string {
  const src = getCategoryCoverSrc(slug);
  if (src.startsWith('http')) return src;
  if (src.includes('/') && import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return imageUrl(src, { width: 1200, quality: 'auto:good' });
  }
  return new URL(`/images/${src.replace(/^\//, '')}`, siteOrigin).href;
}
