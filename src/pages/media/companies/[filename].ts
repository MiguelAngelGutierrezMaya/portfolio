import type { APIRoute } from 'astro';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { getRuntimeManagedMediaSigner } from '@portfolio/infrastructure/media/S3ManagedMediaSigner';
import { getRuntimePortfolioRepository } from '@portfolio/infrastructure/repositories/runtimePortfolioRepository';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const filename = params.filename;
  if (!filename) return new Response('Company logo not found', { status: 404 });

  try {
    const content = await GetPortfolioContent.execute(getRuntimePortfolioRepository());
    const requestedPath = `/media/companies/${filename}`;
    const isPublished = content.experiences.some(
      experience => experience.logo?.src === requestedPath
    );
    if (!isPublished) return new Response('Company logo not found', { status: 404 });

    const url = await getRuntimeManagedMediaSigner('companies').createUrl(filename);
    return new Response(null, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=30',
        Location: url,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Invalid managed media filename') {
      return new Response('Invalid company logo filename', { status: 400 });
    }
    return new Response('Company logo temporarily unavailable', { status: 503 });
  }
};
