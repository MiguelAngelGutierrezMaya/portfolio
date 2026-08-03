import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://example.com';
  const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();

  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
