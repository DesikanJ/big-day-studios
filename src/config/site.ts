/** Public Cloudinary cloud name (safe to commit — visible in image URLs) */
export const CLOUDINARY_CLOUD_NAME = 'dtpsk76yw';

export const site = {
  name: 'Big Day Studios',
  tagline: 'Every moment, beautifully yours.',
  description:
    'Premium wedding, maternity & newborn photography in Chennai. Warm, cinematic portraits for your most cherished milestones.',
  location: 'Chennai, Tamil Nadu',
  email: 'pari@bigdaystudios.com',
  phone: '+91 98404 51199',
  googleRating: '4.9',
  stats: [
    { value: '1000+', label: 'Happy Families' },
    { value: '8 +', label: 'Years of Experience' },
    { value: '3 - 7', label: 'Day Delivery' },
    { value: '4.9 ★', label: 'Google Ratings' },
  ],
} as const;

export function whatsappUrl(message?: string): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '919840451199';
  const text = message ?? 'Hi Big Day Studios! I would like to book a photoshoot.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
