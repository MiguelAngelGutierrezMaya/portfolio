import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://example.com';
  const routes = ['/', '/privacy/', '/terms/'];
  const urls = routes
    .map(
      route =>
        `<url><loc>${new URL(route, baseUrl).toString()}</loc><changefreq>monthly</changefreq></url>`
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
