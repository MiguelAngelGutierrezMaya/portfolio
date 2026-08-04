import type { APIRoute } from 'astro';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { getRuntimeProjectPreviewSigner } from '@portfolio/infrastructure/media/S3ProjectPreviewSigner';
import { getRuntimePortfolioRepository } from '@portfolio/infrastructure/repositories/runtimePortfolioRepository';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const filename = params.filename;
  if (!filename) return new Response('Project preview not found', { status: 404 });

  try {
    const content = await GetPortfolioContent.execute(getRuntimePortfolioRepository());
    const requestedPath = `/media/projects/${filename}`;
    const isPublished = content.projects.some(project => project.preview?.src === requestedPath);
    if (!isPublished) return new Response('Project preview not found', { status: 404 });

    const url = await getRuntimeProjectPreviewSigner().createUrl(filename);
    return new Response(null, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=30',
        Location: url,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Invalid project preview filename') {
      return new Response('Invalid project preview filename', { status: 400 });
    }
    return new Response('Project preview temporarily unavailable', { status: 503 });
  }
};
