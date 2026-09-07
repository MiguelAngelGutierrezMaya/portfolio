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
    expect(
      content.projects.filter(project => project.preview?.presentation === 'generic')
    ).toHaveLength(8);
    expect(content.projects[21]?.preview?.presentation).not.toBe('generic');
    expect(content.navigation).toHaveLength(4);
  });

  it('keeps project identifiers unique', async () => {
    const { projects } = await GetPortfolioContent.execute(new ContentFilePortfolioRepository());
    const ids = projects.map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('returns the localized editorial content for Spanish', async () => {
    const content = await GetPortfolioContent.execute(new ContentFilePortfolioRepository(), 'es');

    expect(content.profile.introduction).toContain('Ingeniero de producto y Mobile');
    expect(content.footer.legalLinks.map(link => link.href)).toEqual([
      '/es/privacy/',
      '/es/terms/',
    ]);
    expect(content.projects).toHaveLength(30);
  });

  it('rejects malformed content at the infrastructure boundary', async () => {
    const malformed = {
      schemaVersion: 1,
      projects: [],
      experiences: [],
      skillGroups: [],
    };
    const repository = new ContentFilePortfolioRepository({ en: malformed, es: malformed });

    await expect(GetPortfolioContent.execute(repository)).rejects.toThrow();
  });
});
