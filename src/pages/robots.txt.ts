import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://example.com';
  const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
