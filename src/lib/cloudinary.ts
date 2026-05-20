/**
 * Build Cloudinary URLs when PUBLIC_CLOUDINARY_CLOUD_NAME is set.
 * Falls back to local /images/ paths for development.
 */
export type ImageTransform = {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif';
};

export function imageUrl(
  src: string,
  transform: ImageTransform = {},
): string {
  const cloud = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  const folder = import.meta.env.PUBLIC_CLOUDINARY_FOLDER ?? 'big-day';

  if (!cloud || src.startsWith('http') || src.startsWith('/')) {
    if (src.startsWith('http') || src.startsWith('/')) return src;
    return `/images/${src}`;
  }

  const parts: string[] = [];
  if (transform.width) parts.push(`w_${transform.width}`);
  if (transform.height) parts.push(`h_${transform.height}`);
  if (transform.crop) parts.push(`c_${transform.crop}`);
  parts.push(`q_${transform.quality ?? 'auto'}`, `f_${transform.format ?? 'auto'}`);

  const publicId = src.includes('/') ? src : `${folder}/${src}`;
  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join(',')}/${publicId}`;
}

export function srcSet(
  src: string,
  widths: number[],
  transform: Omit<ImageTransform, 'width'> = {},
): string {
  return widths
    .map((w) => `${imageUrl(src, { ...transform, width: w })} ${w}w`)
    .join(', ');
}
