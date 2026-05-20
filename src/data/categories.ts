export type Category = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  order: number;
};

export const categories: Category[] = [
  {
    slug: 'wedding',
    title: 'Wedding Photography',
    tagline: 'Elegant & Cinematic',
    description:
      'Timeless wedding portraits and candid moments — from engagement to the last dance.',
    coverImage: 'category-wedding.png',
    order: 1,
  },
  {
    slug: 'maternity',
    title: 'Maternity Shoot',
    tagline: 'Celebrate Motherhood',
    description:
      'Soft, glowing maternity portraits in our comfortable Chennai studio.',
    coverImage: 'category-maternity.png',
    order: 2,
  },
  {
    slug: 'newborn',
    title: 'Newborn & Baby',
    tagline: 'Adorable & Safe',
    description:
      'Gentle newborn sessions with a fully equipped, temperature-controlled setup.',
    coverImage: 'gallery-5.png',
    order: 3,
  },
  {
    slug: 'birthday-kids',
    title: 'Birthday & Kids',
    tagline: 'Fun & Vibrant',
    description:
      'Colourful birthday and kids portraits that capture pure joy and personality.',
    coverImage: 'gallery-6.png',
    order: 4,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
