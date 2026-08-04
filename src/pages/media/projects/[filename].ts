import type { APIRoute } from 'astro';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { getRuntimeManagedMediaSigner } from '@portfolio/infrastructure/media/S3ManagedMediaSigner';
import { getRuntimePortfolioRepository } from '@portfolio/infrastructure/repositories/runtimePortfolioRepository';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.filename;
  if (!slug) return new Response('Project preview not found', { status: 404 });
  if (!/^[a-z0-9][a-z0-9_-]*$/i.test(slug)) {
    return new Response('Invalid project preview filename', { status: 400 });
  }

  try {
    const content = await GetPortfolioContent.execute(getRuntimePortfolioRepository());
    const filename = `${slug}.webp`;
    const requestedPath = `/media/projects/${filename}`;
    const isPublished = content.projects.some(project => project.preview?.src === requestedPath);
    if (!isPublished) return new Response('Project preview not found', { status: 404 });

    const url = await getRuntimeManagedMediaSigner('projects').createUrl(filename);
    return new Response(null, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=30',
        Location: url,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Invalid managed media filename') {
      return new Response('Invalid project preview filename', { status: 400 });
    }
    return new Response('Project preview temporarily unavailable', { status: 503 });
  }
};
