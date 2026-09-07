import { defaultLocale, type Locale } from '@i18n/domain/Locale';
import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

export class GetPortfolioContent {
  static execute(
    repository: PortfolioRepository,
    locale: Locale = defaultLocale
  ): Promise<PortfolioContent> {
    return repository.getContent(locale);
  }
}
