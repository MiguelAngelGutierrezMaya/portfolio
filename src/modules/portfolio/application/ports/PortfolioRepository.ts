import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

export interface PortfolioRepository {
  getContent(): Promise<PortfolioContent>;
}
