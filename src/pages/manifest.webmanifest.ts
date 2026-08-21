import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'Migudev — Miguel Gutierrez',
      short_name: 'Migudev',
      description: 'Portfolio of Miguel Gutierrez, Product Engineer, Fullstack & Mobile.',
      start_url: '/',
      display: 'standalone',
      background_color: '#090b0f',
      theme_color: '#090b0f',
      icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } }
  );
