import englishPortfolioSource from '@/content/portfolio.json';
import spanishPortfolioSource from '@/content/portfolio.es.json';

import { defaultLocale, type Locale } from '@i18n/domain/Locale';
import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';
import { portfolioContentSchema } from '@portfolio/infrastructure/content/PortfolioContentSchema';

export class ContentFilePortfolioRepository implements PortfolioRepository {
  constructor(
    private readonly sources: Record<Locale, unknown> = {
      en: englishPortfolioSource,
      es: spanishPortfolioSource,
    }
  ) {}

  async getContent(locale: Locale = defaultLocale): Promise<PortfolioContent> {
    return portfolioContentSchema.parse(this.sources[locale]);
  }
}
