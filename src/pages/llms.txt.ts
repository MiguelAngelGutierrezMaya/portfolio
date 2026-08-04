import type { APIRoute } from 'astro';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { getRuntimePortfolioRepository } from '@portfolio/infrastructure/repositories/runtimePortfolioRepository';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const content = await GetPortfolioContent.execute(getRuntimePortfolioRepository());
  const baseUrl = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://migudev.com';
  const homeUrl = new URL('/', baseUrl).toString();
  const response = [
    `# ${content.profile.brandName}`,
    '',
    `> ${content.profile.name} is a ${content.profile.jobTitle} based in ${content.profile.location}, focused on clear, fast and scalable web, backend and mobile products.`,
    '',
    content.profile.introduction,
    '',
    '## Primary resources',
    '',
    `- [Portfolio](${homeUrl}): Professional profile, capabilities, selected projects, experience and contact information.`,
    `- [Full portfolio context](${new URL('/llms-full.txt', baseUrl)}): Complete machine-readable project, experience and technology context.`,
    `- [Sitemap](${new URL('/sitemap.xml', baseUrl)}): Canonical index of public pages.`,
    '',
    '## Legal',
    '',
    `- [Privacy policy](${new URL('/privacy/', baseUrl)}): How this site handles visitor information.`,
    `- [Terms of use](${new URL('/terms/', baseUrl)}): Terms governing use of this portfolio.`,
    '',
  ].join('\n');

  return new Response(response, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
