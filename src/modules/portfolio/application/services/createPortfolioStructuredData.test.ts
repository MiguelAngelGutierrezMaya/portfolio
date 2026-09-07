import { describe, expect, it } from 'vitest';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { ContentFilePortfolioRepository } from '@portfolio/infrastructure/repositories/ContentFilePortfolioRepository';

import { createPortfolioStructuredData } from './createPortfolioStructuredData';

describe('createPortfolioStructuredData', () => {
  it('publishes locale-specific profile and project metadata', async () => {
    const content = await GetPortfolioContent.execute(new ContentFilePortfolioRepository(), 'es');
    const result = createPortfolioStructuredData(content, 'es', 'https://migudev.com');
    const graph = result['@graph'] as Array<Record<string, unknown>>;

    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'WebSite', inLanguage: ['en', 'es'] }),
        expect.objectContaining({
          '@type': 'ProfilePage',
          inLanguage: 'es',
          url: 'https://migudev.com/es/',
        }),
      ])
    );
  });
});
