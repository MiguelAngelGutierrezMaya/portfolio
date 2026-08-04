import { describe, expect, it, vi } from 'vitest';

import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

import {
  CachedPortfolioRepository,
  ResilientPortfolioRepository,
} from './ResilientPortfolioRepository';

const content = { profile: { brandName: 'Migudev' } } as PortfolioContent;

describe('ResilientPortfolioRepository', () => {
  it('serves the bundled snapshot when the remote source fails', async () => {
    const failure = new Error('S3 unavailable');
    const primary: PortfolioRepository = { getContent: vi.fn().mockRejectedValue(failure) };
    const fallback: PortfolioRepository = { getContent: vi.fn().mockResolvedValue(content) };
    const reportFailure = vi.fn();

    await expect(
      new ResilientPortfolioRepository(primary, fallback, reportFailure).getContent()
    ).resolves.toBe(content);
    expect(reportFailure).toHaveBeenCalledWith(failure);
  });
});

describe('CachedPortfolioRepository', () => {
  it('deduplicates concurrent reads and refreshes after the TTL', async () => {
    let currentTime = 1_000;
    const repository: PortfolioRepository = {
      getContent: vi.fn().mockResolvedValue(content),
    };
    const cached = new CachedPortfolioRepository(repository, 100, () => currentTime);

    await Promise.all([cached.getContent(), cached.getContent()]);
    await cached.getContent();
    expect(repository.getContent).toHaveBeenCalledTimes(1);

    currentTime = 1_101;
    await cached.getContent();
    expect(repository.getContent).toHaveBeenCalledTimes(2);
  });

  it('serves a stale snapshot if a refresh fails', async () => {
    let currentTime = 1_000;
    const getContent = vi
      .fn()
      .mockResolvedValueOnce(content)
      .mockRejectedValueOnce(new Error('temporary failure'));
    const cached = new CachedPortfolioRepository({ getContent }, 10, () => currentTime);

    await cached.getContent();
    currentTime = 1_011;

    await expect(cached.getContent()).resolves.toBe(content);
  });
});
