import portfolioSource from '@/content/portfolio.json';

import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';
import { portfolioContentSchema } from '@portfolio/infrastructure/content/PortfolioContentSchema';

export class ContentFilePortfolioRepository implements PortfolioRepository {
  constructor(private readonly source: unknown = portfolioSource) {}

  getContent(): PortfolioContent {
    const { projects, experiences, skillGroups } = portfolioContentSchema.parse(this.source);

    return { projects, experiences, skillGroups };
  }
}
