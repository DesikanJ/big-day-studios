export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Gallery = {
  categorySlug: string;
  photos: GalleryPhoto[];
};

/** Replace with Cloudinary public IDs after upload; local Figma exports for launch. */
export const galleries: Gallery[] = [
  {
    categorySlug: 'wedding',
    photos: [
      { src: 'gallery-1.png', alt: 'Wedding couple portrait', width: 1160, height: 773 },
      { src: 'gallery-2.png', alt: 'Wedding ceremony moment', width: 1160, height: 773 },
      { src: 'gallery-3.png', alt: 'Bridal portrait', width: 1160, height: 773 },
      { src: 'hero-1.png', alt: 'Wedding detail', width: 320, height: 479 },
      { src: 'hero-2.png', alt: 'Couple embrace', width: 320, height: 480 },
    ],
  },
  {
    categorySlug: 'maternity',
    photos: [
      { src: 'category-maternity.png', alt: 'Maternity studio portrait', width: 1160, height: 773 },
      { src: 'gallery-4.png', alt: 'Expecting mother portrait', width: 1160, height: 773 },
      { src: 'gallery-5.png', alt: 'Maternity couple session', width: 832, height: 1159 },
      { src: 'why-choose.png', alt: 'Studio maternity setup', width: 333, height: 500 },
    ],
  },
  {
    categorySlug: 'newborn',
    photos: [
      { src: 'gallery-5.png', alt: 'Newborn wrapped portrait', width: 832, height: 1159 },
      { src: 'gallery-6.png', alt: 'Baby close-up', width: 795, height: 1159 },
      { src: 'hero-3.png', alt: 'Newborn detail', width: 480, height: 320 },
      { src: 'hero-4.png', alt: 'Baby with parents', width: 480, height: 320 },
    ],
  },
  {
    categorySlug: 'birthday-kids',
    photos: [
      { src: 'gallery-6.png', alt: 'Kids birthday celebration', width: 795, height: 1159 },
      { src: 'gallery-4.png', alt: 'Kids portrait session', width: 1160, height: 773 },
      { src: 'hero-5.png', alt: 'Child portrait', width: 320, height: 479 },
      { src: 'gallery-1.png', alt: 'Family kids moment', width: 1160, height: 773 },
    ],
  },
];

export function getGallery(categorySlug: string): Gallery | undefined {
  return galleries.find((g) => g.categorySlug === categorySlug);
}
