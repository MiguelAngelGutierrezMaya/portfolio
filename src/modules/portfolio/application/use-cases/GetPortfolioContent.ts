import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

export class GetPortfolioContent {
  static execute(repository: PortfolioRepository): Promise<PortfolioContent> {
    return repository.getContent();
  }
}
