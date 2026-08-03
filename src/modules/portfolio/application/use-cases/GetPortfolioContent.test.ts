import { describe, expect, it } from 'vitest';

import { ContentFilePortfolioRepository } from '@portfolio/infrastructure/repositories/ContentFilePortfolioRepository';

import { GetPortfolioContent } from './GetPortfolioContent';

describe('GetPortfolioContent', () => {
  it('returns the complete curated portfolio', () => {
    const content = GetPortfolioContent.execute(new ContentFilePortfolioRepository());

    expect(content.projects).toHaveLength(23);
    expect(content.experiences).toHaveLength(5);
    expect(content.skillGroups).toHaveLength(3);
  });

  it('keeps project identifiers unique', () => {
    const { projects } = GetPortfolioContent.execute(new ContentFilePortfolioRepository());
    const ids = projects.map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('rejects malformed content at the infrastructure boundary', () => {
    const repository = new ContentFilePortfolioRepository({
      schemaVersion: 1,
      projects: [],
      experiences: [],
      skillGroups: [],
    });

    expect(() => GetPortfolioContent.execute(repository)).toThrow();
  });
});
