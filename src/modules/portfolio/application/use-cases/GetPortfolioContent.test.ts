import { describe, expect, it } from 'vitest';

import { ContentFilePortfolioRepository } from '@portfolio/infrastructure/repositories/ContentFilePortfolioRepository';

import { GetPortfolioContent } from './GetPortfolioContent';

describe('GetPortfolioContent', () => {
  it('returns the complete curated portfolio', async () => {
    const content = await GetPortfolioContent.execute(new ContentFilePortfolioRepository());

    expect(content.projects).toHaveLength(30);
    expect(content.experiences).toHaveLength(6);
    expect(content.skillGroups).toHaveLength(3);
    expect(content.capabilities).toHaveLength(3);
    expect(content.profile.brandName).toBe('Migudev');
    expect(content.experiences[0]?.company).toBe('Assignar');
    expect(content.experiences[0]?.endDate).toBeNull();
    expect(content.projects[21]?.id).toBe('biky-ai-native');
    expect(content.navigation).toHaveLength(4);
  });

  it('keeps project identifiers unique', async () => {
    const { projects } = await GetPortfolioContent.execute(new ContentFilePortfolioRepository());
    const ids = projects.map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('rejects malformed content at the infrastructure boundary', async () => {
    const repository = new ContentFilePortfolioRepository({
      schemaVersion: 1,
      projects: [],
      experiences: [],
      skillGroups: [],
    });

    await expect(GetPortfolioContent.execute(repository)).rejects.toThrow();
  });
});
