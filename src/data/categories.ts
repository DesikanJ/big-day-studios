/**
 * Site categories ↔ Cloudinary Media Library folders (exclude "samples").
 * Run `npm run sync:galleries` after uploading photos to Cloudinary.
 */
export type Category = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Cloudinary folder name (must match Media Library exactly) */
  cloudinaryFolder: string;
  order: number;
  /** Fallback cover when gallery not synced yet (local path under /images/) */
  coverFallback?: string;
};

export const categories: Category[] = [
  {
    slug: 'wedding',
    title: 'Wedding Photography',
    tagline: 'Elegant & Cinematic',
    description:
      'Timeless wedding portraits and candid moments — from engagement to the last dance.',
    cloudinaryFolder: 'Wedding',
    order: 1,
    coverFallback: 'category-wedding.png',
  },
  {
    slug: 'maternity',
    title: 'Maternity Shoot',
    tagline: 'Celebrate Motherhood',
    description:
      'Soft, glowing maternity portraits in our comfortable Chennai studio.',
    cloudinaryFolder: 'Maternity',
    order: 2,
    coverFallback: 'category-maternity.png',
  },
  {
    slug: 'baby-photoshoot',
    title: 'Baby Photoshoot',
    tagline: 'Adorable & Safe',
    description:
      'Gentle newborn and baby sessions with a fully equipped, temperature-controlled setup.',
    cloudinaryFolder: 'Baby Photoshoot',
    order: 3,
    coverFallback: 'gallery-5.png',
  },
  {
    slug: 'birthday',
    title: 'Birthday',
    tagline: 'Fun & Vibrant',
    description:
      'Colourful birthday celebrations and kids portraits full of joy and personality.',
    cloudinaryFolder: 'Birthday',
    order: 4,
    coverFallback: 'gallery-6.png',
  },
  {
    slug: 'family-photoshoot',
    title: 'Family Photoshoot',
    tagline: 'Together Forever',
    description:
      'Warm, natural family portraits — indoors or on location — that you will cherish for years.',
    cloudinaryFolder: 'Family Photoshoot',
    order: 5,
    coverFallback: 'gallery-1.png',
  },
  {
    slug: 'celebrity',
    title: 'Celebrity',
    tagline: 'Red Carpet Ready',
    description:
      'Polished, high-impact portraits and event coverage with a cinematic finish.',
    cloudinaryFolder: 'Celebrity',
    order: 6,
    coverFallback: 'gallery-2.png',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
