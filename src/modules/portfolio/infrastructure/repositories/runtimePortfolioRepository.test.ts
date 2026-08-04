import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContentFilePortfolioRepository } from './ContentFilePortfolioRepository';
import { CachedPortfolioRepository } from './ResilientPortfolioRepository';
import { createRuntimePortfolioRepository } from './runtimePortfolioRepository';

describe('runtimePortfolioRepository', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses the bundled and validated snapshot when no runtime bucket is configured', async () => {
    const repository = createRuntimePortfolioRepository({});

    expect(repository).toBeInstanceOf(ContentFilePortfolioRepository);
    await expect(repository.getContent()).resolves.toMatchObject({
      profile: { name: expect.any(String) },
    });
  });

  it.each([undefined, '-1', 'invalid'])(
    'creates a cached S3 repository with safe TTL %s',
    value => {
      const repository = createRuntimePortfolioRepository({
        bucket: 'private-content',
        cacheTtlSeconds: value,
      });

      expect(repository).toBeInstanceOf(CachedPortfolioRepository);
    }
  );

  it('returns one process-wide repository instance', async () => {
    vi.stubEnv('CONTENT_BUCKET', '');
    const { getRuntimePortfolioRepository } = await import('./runtimePortfolioRepository');

    expect(getRuntimePortfolioRepository()).toBe(getRuntimePortfolioRepository());
  });
});
