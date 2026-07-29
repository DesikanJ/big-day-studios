/** Public Cloudinary cloud name (safe to commit visible in image URLs) */
export const CLOUDINARY_CLOUD_NAME = 'dtpsk76yw';

export const site = {
  name: 'Big Day Studios',
  /** Header/footer brand mark (PNG in public/images/) */
  logo: '/images/logo.png',
  logoAlt: 'Big Day Studios wedding and portrait photography, Chennai',
  tagline: 'Every moment, beautifully yours.',
  url: 'https://bigdaystudios.in',
  description:
    'Wedding, maternity, newborn, family & passport size photography in Keelkattalai, Chennai. Studio and on-location shoots across Tamil Nadu.',
  location:
    '29e, First Floor, Saroja Ammal Complex, Medavakkam Main Rd, Keelkattalai, Chennai, Tamil Nadu 600117',
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
    defaultTitle: 'Wedding & Maternity Photos in Keelkattalai',
    locale: 'en_IN',
    /** Approx. Keelkattalai / Medavakkam Main Rd, replace with exact pin from Google Maps if available */
    geo: { latitude: 12.9547, longitude: 80.2042 },
    streetAddress: '29e, First Floor, Saroja Ammal Complex, Medavakkam Main Rd' as string,
    postalCode: '600117' as string,
    priceRange: '₹₹',
    /** Paste your Google Business Profile / Maps link when ready */
    googleMapsUrl: '' as string,
    /** Instagram / Facebook profile URLs for sameAs schema */
    sameAs: [] as string[],
    services: [
      'Wedding photography',
      'Maternity photography',
      'Newborn photography',
      'Baby photoshoot',
      'Birthday photography',
      'Family photoshoot',
      'Celebrity & event photography',
      'Passport size photography',
      'Visa photograph',
    ],
    areasServed: [
      'Keelkattalai',
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
        a: 'Yes. Big Day Studios covers weddings across Chennai and Tamil Nadu: candid moments, traditional ceremonies, and cinematic portraits.',
      },
      {
        q: 'Where is your maternity and baby photoshoot studio?',
        a: 'We shoot maternity, newborn, and baby sessions at our temperature-controlled studio in Keelkattalai on Medavakkam Main Road. See the contact section for the full studio address.',
      },
      {
        q: 'Do you take passport size photos in Keelkattalai?',
        a: 'Yes. We offer passport size and visa photographs at our Keelkattalai studio on Medavakkam Main Road, with compliant sizing for Indian and international applications. Message us on WhatsApp to book.',
      },
      {
        q: 'How do I book a photoshoot?',
        a: 'Message us on WhatsApp with your preferred date and session type. We typically reply within a few hours.',
      },
      {
        q: 'Do you travel outside Chennai?',
        a: 'Yes, we shoot on location across Chennai neighbourhoods including Keelkattalai and can travel to nearby cities for weddings and events.',
      },
    ],
  },
} as const;

export function whatsappUrl(message?: string): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '919840451199';
  const text = message ?? 'Hi Big Day Studios! I would like to book a photoshoot in Keelkattalai, Chennai.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
