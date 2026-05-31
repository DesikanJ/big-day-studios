/**
 * Bundles site data for external teams (simulators, mocks, CMS imports).
 * Run: npm run export:simulator
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'exports', 'simulator-data');

const CLOUDINARY_CLOUD_NAME = 'dtpsk76yw';
const SITE_URL = 'https://bigdaystudios.in';

function cloudinaryUrl(publicId, width = 1600) {
  const transforms = `c_limit,w_${width},q_auto:good,f_auto`;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

function isLocalImage(src) {
  return /^(gallery-|hero-|category-|why-choose|cta-banner|testimonial-avatar)/.test(src) || /\.(png|jpe?g|webp)$/i.test(src);
}

function localImageUrl(filename) {
  return `${SITE_URL}/images/${filename}`;
}

function parseGalleriesGenerated(ts) {
  const galleries = [];
  const galleryBlocks = ts.matchAll(/categorySlug:\s*'([^']+)',\s*photos:\s*\[([\s\S]*?)\]\s*,/g);
  for (const [, categorySlug, photosBlock] of galleryBlocks) {
    const photos = [];
    const photoRe =
      /\{\s*src:\s*'((?:\\'|[^'])*)',\s*alt:\s*'((?:\\'|[^'])*)',\s*width:\s*(\d+),\s*height:\s*(\d+)\s*\}/g;
    let m;
    while ((m = photoRe.exec(photosBlock)) !== null) {
      const src = m[1].replace(/\\'/g, "'");
      photos.push({
        src,
        alt: m[2].replace(/\\'/g, "'"),
        width: Number(m[3]),
        height: Number(m[4]),
      });
    }
    galleries.push({ categorySlug, photos });
  }
  return galleries;
}

const categories = [
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
    galleryPath: '/gallery/wedding/',
  },
  {
    slug: 'maternity',
    title: 'Maternity Shoot',
    tagline: 'Celebrate Motherhood',
    description: 'Soft, glowing maternity portraits in our comfortable Chennai studio.',
    seoTitle: 'Maternity Photoshoot Chennai',
    seoDescription:
      'Maternity photography in Chennai — glowing studio portraits & on-location shoots. Celebrate motherhood with Big Day Studios.',
    cloudinaryFolder: 'Maternity',
    order: 2,
    coverFallback: 'category-maternity.png',
    galleryPath: '/gallery/maternity/',
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
    galleryPath: '/gallery/baby-photoshoot/',
  },
  {
    slug: 'birthday',
    title: 'Birthday',
    tagline: 'Fun & Vibrant',
    description: 'Colourful birthday celebrations and kids portraits full of joy and personality.',
    seoTitle: 'Birthday Photoshoot Chennai',
    seoDescription:
      'Kids birthday photography in Chennai — vibrant party coverage & portrait sessions. Fun, colourful memories by Big Day Studios.',
    cloudinaryFolder: 'Birthday',
    order: 4,
    coverFallback: 'gallery-6.png',
    galleryPath: '/gallery/birthday/',
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
    galleryPath: '/gallery/family-photoshoot/',
  },
  {
    slug: 'celebrity',
    title: 'Celebrity',
    tagline: 'Red Carpet Ready',
    description: 'Polished, high-impact portraits and event coverage with a cinematic finish.',
    seoTitle: 'Celebrity & Event Photography Chennai',
    seoDescription:
      'Celebrity and event photography in Chennai — polished portraits and red-carpet coverage with a cinematic finish.',
    cloudinaryFolder: 'Celebrity',
    order: 6,
    coverFallback: 'gallery-2.png',
    galleryPath: '/gallery/celebrity/',
  },
];

const UNAVAILABLE = new Set(['Pariaarclicks009_yp3bp8']);

const placeholders = [
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

function enrichPhoto(photo, categorySlug) {
  const local = isLocalImage(photo.src);
  return {
    ...photo,
    categorySlug,
    source: local ? 'local' : 'cloudinary',
    cloudinaryPublicId: local ? null : photo.src,
    imageUrl: local ? localImageUrl(photo.src) : cloudinaryUrl(photo.src),
    imageUrlThumb: local ? localImageUrl(photo.src) : cloudinaryUrl(photo.src, 480),
  };
}

function mergeGalleries(synced) {
  return categories.map((cat) => {
    const fromCloud = synced.find((g) => g.categorySlug === cat.slug);
    const photos =
      fromCloud?.photos.filter((p) => !UNAVAILABLE.has(p.src)) ??
      placeholders.find((g) => g.categorySlug === cat.slug)?.photos ??
      [];
    const useSynced = fromCloud?.photos.length && photos.length;
    return {
      categorySlug: cat.slug,
      categoryTitle: cat.title,
      cloudinaryFolder: cat.cloudinaryFolder,
      photoCount: photos.length,
      coverPhoto: photos[0] ? enrichPhoto(photos[0], cat.slug) : null,
      photos: photos.map((p) => enrichPhoto(p, cat.slug)),
      dataSource: useSynced ? 'cloudinary_sync' : 'placeholder',
    };
  });
}

const generatedTs = fs.readFileSync(path.join(root, 'src/data/galleries.generated.ts'), 'utf8');
const syncedMatch = generatedTs.match(/Generated:\s*(.+)/);
const syncedAt = syncedMatch ? syncedMatch[1].trim() : null;
const galleriesSynced = parseGalleriesGenerated(generatedTs);
const galleries = mergeGalleries(galleriesSynced);

const exportDoc = {
  meta: {
    brand: 'Big Day Studios',
    exportedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    cloudinaryCloudName: CLOUDINARY_CLOUD_NAME,
    galleriesLastSynced: syncedAt,
    formatsIncluded: ['json', 'csv'],
    notes: [
      'Gallery photos are hosted on Cloudinary; imageUrl fields are ready to fetch.',
      'Local filenames (gallery-*.png, hero-*.png) are served from /images/ on the live site.',
      'Re-run npm run sync:galleries then npm run export:simulator after new Cloudinary uploads.',
    ],
  },
  site: {
    name: 'Big Day Studios',
    tagline: 'Every moment, beautifully yours.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    logoAlt: 'Big Day Studios — wedding and portrait photography, Chennai',
    description:
      'Premium wedding, maternity, newborn & family photography in Chennai. Cinematic portraits, studio & on-location shoots across Tamil Nadu.',
    location: 'Chennai, Tamil Nadu',
    email: 'pari@bigdaystudios.com',
    phone: '+91 7904268507',
    whatsappNumber: '917904268507',
    googleRating: '4.9',
    stats: [
      { value: '1000+', label: 'Happy Families' },
      { value: '8 +', label: 'Years of Experience' },
      { value: '3 - 7', label: 'Day Delivery' },
      { value: '4.9 ★', label: 'Google Ratings' },
    ],
    seo: {
      defaultTitle: 'Wedding & Maternity Photographer in Chennai',
      locale: 'en_IN',
      geo: { latitude: 13.0827, longitude: 80.2707 },
      priceRange: '₹₹',
      services: [
        'Wedding photography',
        'Maternity photography',
        'Newborn photography',
        'Baby photoshoot',
        'Birthday photography',
        'Family photoshoot',
        'Celebrity & event photography',
      ],
      areasServed: [
        'Chennai',
        'Tambaram',
        'Anna Nagar',
        'Adyar',
        'Velachery',
        'OMR',
        'ECR',
        'Porur',
        'Chromepet',
        'Pallavaram',
        'Mogappair',
        'T Nagar',
        'Nanganallur',
        'Avadi',
        'Chengalpattu',
        'Kanchipuram',
        'Thiruvallur',
      ],
      faqs: [
        {
          q: 'Do you offer wedding photography in Chennai?',
          a: 'Yes. Big Day Studios covers weddings across Chennai and Tamil Nadu — candid moments, traditional ceremonies, and cinematic portraits.',
        },
        {
          q: 'Where is your maternity and baby photoshoot studio?',
          a: 'Our comfortable Chennai studio is set up for maternity, newborn, and baby sessions with a temperature-controlled, baby-safe environment.',
        },
        {
          q: 'How do I book a photoshoot?',
          a: 'Message us on WhatsApp with your preferred date and session type. We typically reply within a few hours.',
        },
        {
          q: 'Do you travel outside Chennai?',
          a: 'Yes — we shoot on location across Chennai neighbourhoods and can travel to nearby cities for weddings and events.',
        },
      ],
    },
  },
  navigation: {
    header: [
      { href: '/#services', label: 'Services' },
      { href: '/gallery/', label: 'Gallery' },
      { href: '/#testimonials', label: 'Reviews' },
      { href: '/contact/', label: 'Contact' },
    ],
    footerGalleryLinks: categories.map((c) => ({
      href: c.galleryPath,
      label: `${c.title} Chennai`,
    })),
  },
  categories,
  galleries,
  galleriesSyncedRaw: galleriesSynced.map((g) => ({
    ...g,
    photos: g.photos.map((p) => enrichPhoto(p, g.categorySlug)),
  })),
  placeholders: placeholders.map((g) => ({
    ...g,
    photos: g.photos.map((p) => enrichPhoto(p, g.categorySlug)),
  })),
  excludedCloudinaryIds: [...UNAVAILABLE],
  uiContent: {
    hero: {
      title: 'Every moment,\nbeautifully yours.',
      lead: 'Premium wedding, maternity & newborn photography that captures the warmth, tradition, and joy of your most cherished milestones.',
      collagePhotos: [
        { src: 'hero-4.png', width: 480, height: 320, layout: { left: 0, top: 86, w: 179, h: 230 } },
        { src: 'hero-1.png', width: 320, height: 479, layout: { left: 714, top: 0, w: 179, h: 230 } },
        { src: 'hero-2.png', width: 320, height: 480, layout: { left: 1061, top: 146, w: 179, h: 230 } },
        { src: 'hero-3.png', width: 480, height: 320, layout: { left: 971, top: 410, w: 179, h: 230 } },
        { src: 'hero-5.png', width: 320, height: 479, layout: { left: 42, top: 458, w: 179, h: 230 } },
      ].map((p) => ({ ...p, imageUrl: localImageUrl(p.src) })),
    },
    whyChoose: {
      sectionLabel: 'Why Choose us',
      title: 'Premium quality,\nhonest pricing.',
      lead: 'We believe every family deserves beautiful photographs — not just those with luxury budgets. Our studio is built for Chennai families who value quality, warmth, and professionalism without compromise.',
      image: { src: 'why-choose.png', alt: 'Photographer with family in studio', imageUrl: localImageUrl('why-choose.png') },
      features: [
        { title: 'Safe, Comfortable Studio', description: 'Fully equipped for newborns, maternity & kids' },
        { title: 'On-Time, Every Time', description: 'We respect your schedule and your moments' },
      ],
    },
    worksPreview: {
      sectionLabel: 'Our Works',
      title: "Moments We've Preserved",
      usesCategory: 'wedding',
      maxPhotos: 3,
    },
    testimonials: {
      sectionLabel: 'Kind words',
      title: 'Families who trusted us',
      items: [
        {
          quote:
            "The maternity shoot was everything we dreamed of. The team made us so comfortable, and the photos are absolutely stunning. We'll treasure these forever.",
          author: 'Priya & Anand',
          meta: 'Maternity Shoot · Adyar',
          avatar: { src: 'testimonial-avatar.png', imageUrl: localImageUrl('testimonial-avatar.png') },
        },
      ],
    },
    ctaBanner: {
      title: 'Ready to create memories?',
      lead: 'Book your session today — we reply on WhatsApp within hours.',
      image: { src: 'cta-banner.png', imageUrl: localImageUrl('cta-banner.png') },
    },
    localAreas: {
      sectionLabel: 'Chennai & nearby',
      title: 'Photography across Chennai and surrounding areas',
      lead: 'Based in Chennai, we photograph weddings, maternity sessions, newborns, birthdays, and families across the city — studio sessions and on-location shoots. Travelling for events in nearby towns on request.',
    },
  },
  cloudinary: {
    cloudName: CLOUDINARY_CLOUD_NAME,
    deliveryBase: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    urlPattern: 'https://res.cloudinary.com/{cloudName}/image/upload/c_limit,w_{width},q_auto:good,f_auto/{publicId}',
    categoryFolders: Object.fromEntries(categories.map((c) => [c.slug, c.cloudinaryFolder])),
  },
  localAssetsReferenced: [
    'logo.png',
    'category-wedding.png',
    'category-maternity.png',
    'gallery-1.png',
    'gallery-2.png',
    'gallery-3.png',
    'gallery-5.png',
    'gallery-6.png',
    'hero-1.png',
    'hero-2.png',
    'hero-3.png',
    'hero-4.png',
    'hero-5.png',
    'why-choose.png',
    'cta-banner.png',
    'testimonial-avatar.png',
  ].map((f) => ({ filename: f, url: localImageUrl(f), inRepo: f === 'logo.png' })),
  contactForm: {
    provider: 'web3forms',
    endpoint: 'https://api.web3forms.com/submit',
    sessionTypes: [...categories.map((c) => c.title), 'Other'],
  },
};

fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, 'bigdaystudios-complete-export.json');
fs.writeFileSync(jsonPath, JSON.stringify(exportDoc, null, 2), 'utf8');

const csvRows = [
  [
    'categorySlug',
    'categoryTitle',
    'cloudinaryFolder',
    'photoIndex',
    'src',
    'source',
    'alt',
    'width',
    'height',
    'imageUrl',
    'imageUrlThumb',
  ].join(','),
];

for (const g of galleries) {
  g.photos.forEach((p, i) => {
    const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
    csvRows.push(
      [
        g.categorySlug,
        g.categoryTitle,
        g.cloudinaryFolder,
        i + 1,
        p.src,
        p.source,
        p.alt,
        p.width,
        p.height,
        p.imageUrl,
        p.imageUrlThumb,
      ]
        .map(esc)
        .join(','),
    );
  });
}

const csvPath = path.join(outDir, 'photos-flat.csv');
fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf8');

const readme = `# Big Day Studios — simulator / mock data export

Generated: ${exportDoc.meta.exportedAt}

## Files

| File | Use |
|------|-----|
| \`bigdaystudios-complete-export.json\` | Single bundle: site copy, categories, galleries with full image URLs, UI strings, FAQs |
| \`photos-flat.csv\` | One row per photo — easy for spreadsheets / simulators |

## Quick stats

- **Categories:** ${categories.length}
- **Photos (live galleries):** ${galleries.reduce((n, g) => n + g.photoCount, 0)}
- **Cloudinary cloud:** \`${CLOUDINARY_CLOUD_NAME}\`
- **Last gallery sync:** ${syncedAt ?? 'unknown'}

## Image URLs

- **Cloudinary:** \`photo.imageUrl\` in JSON (1600px wide, auto format/quality)
- **Local placeholders:** \`https://bigdaystudios.in/images/{filename}\`

Custom Cloudinary transforms:

\`\`\`
https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_{width},q_auto:good,f_auto/{publicId}
\`\`\`

## Refreshing data

From the website repo:

\`\`\`bash
npm run sync:galleries   # requires .env Cloudinary API keys
npm run export:simulator
\`\`\`

Share the whole \`exports/simulator-data/\` folder with your team.
`;

fs.writeFileSync(path.join(outDir, 'README.md'), readme, 'utf8');

console.log(`Wrote ${jsonPath}`);
console.log(`Wrote ${csvPath}`);
console.log(`Wrote ${path.join(outDir, 'README.md')}`);
console.log(`Photos: ${galleries.reduce((n, g) => n + g.photoCount, 0)} across ${categories.length} categories`);
