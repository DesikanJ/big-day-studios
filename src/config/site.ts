/** Public Cloudinary cloud name (safe to commit — visible in image URLs) */
export const CLOUDINARY_CLOUD_NAME = 'dtpsk76yw';

export const site = {
  name: 'Big Day Studios',
  /** Header/footer brand mark (PNG in public/images/) */
  logo: '/images/logo.png',
  logoAlt: 'Big Day Studios — wedding and portrait photography, Chennai',
  tagline: 'Every moment, beautifully yours.',
  url: 'https://bigdaystudios.in',
  description:
    'Premium wedding, maternity, newborn & family photography in Chennai. Cinematic portraits, studio & on-location shoots across Tamil Nadu.',
  location: 'Chennai, Tamil Nadu',
  email: 'pari@bigdaystudios.com',
  phone: '+91 79042 68507',
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
    /** Approximate studio / service area centre (Chennai) — update if you have exact coordinates */
    geo: { latitude: 13.0827, longitude: 80.2707 },
    streetAddress: '' as string,
    postalCode: '' as string,
    priceRange: '₹₹',
    googleMapsUrl: '' as string,
    sameAs: [] as string[],
    services: [
      'Wedding photography',
      'Maternity photography',
      'Newborn photography',
      'Baby photoshoot',
      'Birthday photography',
      'Family photoshoot',
      'Celebrity & event photography',
    ],
    /** Cities & neighbourhoods for local search (Chennai + nearby) */
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
} as const;

export function whatsappUrl(message?: string): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '919840451199';
  const text = message ?? 'Hi Big Day Studios! I would like to book a photoshoot in Chennai.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
