import type { Locale } from '@i18n/domain/Locale';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

export interface PortfolioRepository {
  getContent(locale?: Locale): Promise<PortfolioContent>;
}
