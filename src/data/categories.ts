/**
 * Site categories ↔ Cloudinary Media Library folders (exclude "samples").
 * Run `npm run sync:galleries` after uploading photos to Cloudinary.
 */
export type Category = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Meta title & description (local SEO — Chennai keywords) */
  seoTitle: string;
  seoDescription: string;
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
    seoTitle: 'Wedding Photographer in Chennai',
    seoDescription:
      'Cinematic wedding photography in Chennai — candid ceremonies, traditional rituals & portraits. Big Day Studios covers weddings across Tamil Nadu.',
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
    seoTitle: 'Maternity Photoshoot Chennai',
    seoDescription:
      'Maternity photography in Chennai — glowing studio portraits & on-location shoots. Celebrate motherhood with Big Day Studios.',
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
    seoTitle: 'Baby & Newborn Photoshoot Chennai',
    seoDescription:
      'Baby and newborn photoshoots in Chennai — safe, temperature-controlled studio with themed sets. Book your baby session today.',
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
    seoTitle: 'Birthday Photoshoot Chennai',
    seoDescription:
      'Kids birthday photography in Chennai — vibrant party coverage & portrait sessions. Fun, colourful memories by Big Day Studios.',
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
    seoTitle: 'Family Photoshoot Chennai',
    seoDescription:
      'Family photography in Chennai — natural studio & outdoor portraits for all ages. Book a family session with Big Day Studios.',
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
    seoTitle: 'Celebrity & Event Photography Chennai',
    seoDescription:
      'Celebrity and event photography in Chennai — polished portraits and red-carpet coverage with a cinematic finish.',
    cloudinaryFolder: 'Celebrity',
    order: 6,
    coverFallback: 'gallery-2.png',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
