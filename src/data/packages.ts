export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  /** Highlighted “most loved” tier in Figma */
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Perfect for intimate occasions',
    price: '₹ 7,999',
    priceNote: 'onwards · GST included',
    features: [
      '3-hour photo session',
      '1 professional photographer',
      '100+ edited digital photos',
      'Online delivery in 5–7 days',
      '2 outfit changes included',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Our most loved package',
    price: '₹14,999',
    priceNote: 'onwards · GST included',
    featured: true,
    features: [
      'Full-day coverage (8 hrs)',
      '2 photographers + 1 assistant',
      '300+ edited digital photos',
      'Premium printed album (20 pages)',
      'Online gallery link',
      '3-day priority delivery',
      'Unlimited outfit changes',
    ],
  },
  {
    id: 'grand',
    name: 'Grand',
    tagline: 'For landmark celebrations',
    price: '₹ 24,999',
    priceNote: 'onwards · GST included',
    features: [
      '2-day full event coverage',
      '3 photographers + drone shots',
      '600+ edited digital photos',
      'Luxury album (40 pages, leather)',
      'Highlight video reel (3 mins)',
      'Same-day preview (10 photos)',
      'Dedicated relationship manager',
    ],
  },
];
