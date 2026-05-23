import { categories } from './categories';
import { galleriesGenerated } from './galleries.generated';

export type GalleryPhoto = {
  /** Cloudinary public_id (e.g. Wedding/abc) or local filename in public/images/ */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Gallery = {
  categorySlug: string;
  photos: GalleryPhoto[];
};

/** Placeholder photos until Cloudinary sync runs */
const placeholderGalleries: Gallery[] = [
  {
    categorySlug: 'wedding',
    photos: [
      { src: 'gallery-1.png', alt: 'Wedding portrait', width: 1160, height: 773 },
      { src: 'gallery-2.png', alt: 'Wedding moment', width: 1160, height: 773 },
    ],
  },
  {
    categorySlug: 'maternity',
    photos: [{ src: 'category-maternity.png', alt: 'Maternity portrait', width: 1160, height: 773 }],
  },
  {
    categorySlug: 'baby-photoshoot',
    photos: [{ src: 'gallery-5.png', alt: 'Baby portrait', width: 832, height: 1159 }],
  },
  {
    categorySlug: 'birthday',
    photos: [{ src: 'gallery-6.png', alt: 'Birthday portrait', width: 795, height: 1159 }],
  },
  {
    categorySlug: 'family-photoshoot',
    photos: [{ src: 'gallery-1.png', alt: 'Family portrait', width: 1160, height: 773 }],
  },
  {
    categorySlug: 'celebrity',
    photos: [{ src: 'gallery-2.png', alt: 'Celebrity portrait', width: 1160, height: 773 }],
  },
];

function mergeGalleries(): Gallery[] {
  return categories.map((cat) => {
    const synced = galleriesGenerated.find((g) => g.categorySlug === cat.slug);
    if (synced?.photos.length) {
      const photos = synced.photos.filter((p) => !UNAVAILABLE_CLOUDINARY_IDS.has(p.src));
      if (photos.length) return { ...synced, photos };
    }
    return placeholderGalleries.find((g) => g.categorySlug === cat.slug) ?? { categorySlug: cat.slug, photos: [] };
  });
}

export const galleries: Gallery[] = mergeGalleries();

export function getGallery(categorySlug: string): Gallery | undefined {
  return galleries.find((g) => g.categorySlug === categorySlug);
}

/** Deleted/missing in Cloudinary — excluded from galleries and covers */
const UNAVAILABLE_CLOUDINARY_IDS = new Set(['Pariaarclicks009_yp3bp8']);

/** Cover image: first available synced photo, else local fallback */
export function getCategoryCoverSrc(slug: string): string {
  const cat = categories.find((c) => c.slug === slug);
  const gallery = getGallery(slug);
  const cover = gallery?.photos[0];
  if (cover?.src) return cover.src;
  return cat?.coverFallback ?? 'gallery-1.png';
}
