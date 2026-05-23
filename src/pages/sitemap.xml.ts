import type { APIRoute } from 'astro';
import { categories } from '@/data/categories';
import { sitemapUrls } from '@/lib/seo';

export const GET: APIRoute = () => {
  const categoryPaths = categories.map((c) => ({
    path: `/gallery/${c.slug}/`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const urls = sitemapUrls(categoryPaths);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
