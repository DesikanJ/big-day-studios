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

/** Meta description — keep under ~160 characters when possible */
export function truncateDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

export function localBusinessJsonLd() {
  const origin = siteOrigin();
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${origin}/#business`,
    name: site.name,
    description: site.description,
    url: origin,
    telephone: site.phone,
    email: site.email,
    image: `${origin}/images/gallery-1.png`,
    priceRange: site.seo.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
      ...(site.seo.streetAddress ? { streetAddress: site.seo.streetAddress } : {}),
      ...(site.seo.postalCode ? { postalCode: site.seo.postalCode } : {}),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.seo.geo.latitude,
      longitude: site.seo.geo.longitude,
    },
    areaServed: site.seo.areasServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    knowsAbout: site.seo.services,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography services',
      itemListElement: site.seo.services.map((name, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name, areaServed: 'Chennai, Tamil Nadu' },
      })),
    },
  };

  if (site.seo.googleMapsUrl) {
    schema.hasMap = site.seo.googleMapsUrl;
  }

  if (site.seo.sameAs.length) {
    schema.sameAs = site.seo.sameAs;
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
  const origin = siteOrigin();
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
    areaServed: {
      '@type': 'City',
      name: 'Chennai',
      containedInPlace: { '@type': 'State', name: 'Tamil Nadu' },
    },
    serviceType: category.title,
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

export function sitemapUrls(
  extraPaths: { path: string; changefreq: string; priority: string }[] = [],
): { loc: string; changefreq: string; priority: string }[] {
  const base = siteOrigin();
  const paths = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/gallery/', changefreq: 'weekly', priority: '0.9' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.8' },
    ...extraPaths,
  ];

  return paths.map((p) => ({
    loc: `${base}${p.path.endsWith('/') ? p.path : `${p.path}/`}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }));
}
