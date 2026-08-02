import { describe, expect, it } from 'vitest';

import { StaticPortfolioRepository } from '@portfolio/infrastructure/repositories/StaticPortfolioRepository';

import { GetPortfolioContent } from './GetPortfolioContent';

describe('GetPortfolioContent', () => {
  it('returns the complete curated portfolio', () => {
    const content = GetPortfolioContent.execute(new StaticPortfolioRepository());

    expect(content.projects).toHaveLength(23);
    expect(content.experiences).toHaveLength(5);
    expect(content.skillGroups).toHaveLength(3);
  });

  it('keeps project identifiers unique', () => {
    const { projects } = GetPortfolioContent.execute(new StaticPortfolioRepository());
    const ids = projects.map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
