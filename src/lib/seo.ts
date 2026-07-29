import { site } from '@/config/site';
import type { Category } from '@/data/categories';

export function siteOrigin(): string {
  return (import.meta.env.PUBLIC_SITE_URL ?? site.url).replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
  const base = siteOrigin();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function pageTitle(page?: string): string {
  if (!page) return `${site.name} | ${site.seo.defaultTitle}`;
  return `${page} | ${site.name} Chennai`;
}

/** Meta description keep under ~160 characters when possible */
export function truncateDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

export function localBusinessJsonLd() {
  const origin = siteOrigin();
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'PhotographyBusiness'],
    '@id': `${origin}/#business`,
    name: site.name,
    alternateName: 'Big Day Studios Keelkattalai',
    description: site.description,
    url: origin,
    telephone: site.phone,
    email: site.email,
    image: `${origin}/images/logo.png`,
    logo: `${origin}/images/logo.png`,
    priceRange: site.seo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.seo.streetAddress || 'Keelkattalai',
      addressLocality: 'Keelkattalai',
      addressRegion: 'Tamil Nadu',
      postalCode: site.seo.postalCode || '600117',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.seo.geo.latitude,
      longitude: site.seo.geo.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.googleRating,
      bestRating: '5',
      worstRating: '1',
      reviewCount: String(site.googleReviewCount),
    },
    openingHoursSpecification: site.seo.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: site.seo.areasServed.map((name) => ({
      '@type': name === 'Chennai' || name === 'Keelkattalai' ? 'City' : 'Place',
      name,
    })),
    knowsAbout: site.seo.services,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography services in Keelkattalai, Chennai',
      itemListElement: site.seo.services.map((name, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name,
          areaServed: ['Keelkattalai', 'Chennai', 'Tamil Nadu'],
          provider: { '@id': `${origin}/#business` },
        },
      })),
    },
  };

  if (site.seo.googleMapsUrl) {
    schema.hasMap = site.seo.googleMapsUrl;
  }

  if (site.seo.sameAs.length) {
    schema.sameAs = [...site.seo.sameAs];
  }

  return schema;
}

export function webSiteJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: site.name,
    url: origin,
    description: site.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${origin}/#business` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function servicePageJsonLd(category: Category) {
  const origin = siteOrigin();
  const pageUrl = absoluteUrl(`/gallery/${category.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.seoTitle,
    description: category.seoDescription,
    url: pageUrl,
    provider: { '@id': `${origin}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Keelkattalai' },
      { '@type': 'City', name: 'Chennai', containedInPlace: { '@type': 'State', name: 'Tamil Nadu' } },
    ],
    serviceType: category.title,
  };
}

/** Dedicated landing page schema (e.g. passport service URL) */
export function standaloneServiceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': `${origin}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Keelkattalai' },
      { '@type': 'City', name: 'Chennai' },
    ],
    serviceType: opts.serviceType,
  };
}

export function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.seo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/** ItemList for the /services/ hub page */
export function servicesHubJsonLd(
  items: { name: string; path: string; description: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Photography services in Keelkattalai, Chennai',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      description: item.description,
    })),
  };
}

export function sitemapUrls(
  extraPaths: { path: string; changefreq: string; priority: string }[] = [],
): { loc: string; changefreq: string; priority: string }[] {
  const base = siteOrigin();
  const paths = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/gallery/', changefreq: 'weekly', priority: '0.9' },
    { path: '/services/', changefreq: 'weekly', priority: '0.9' },
    { path: '/services/passport-photos/', changefreq: 'monthly', priority: '0.95' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.8' },
    ...extraPaths,
  ];

  return paths.map((p) => ({
    loc: `${base}${p.path.endsWith('/') ? p.path : `${p.path}/`}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }));
}
