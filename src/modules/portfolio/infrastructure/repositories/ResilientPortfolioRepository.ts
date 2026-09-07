import { defaultLocale, type Locale } from '@i18n/domain/Locale';
import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

type FailureReporter = (error: unknown) => void;

export class ResilientPortfolioRepository implements PortfolioRepository {
  constructor(
    private readonly primary: PortfolioRepository,
    private readonly fallback: PortfolioRepository,
    private readonly reportFailure: FailureReporter = () => undefined
  ) {}

  async getContent(locale: Locale = defaultLocale): Promise<PortfolioContent> {
    try {
      return await this.primary.getContent(locale);
    } catch (error: unknown) {
      this.reportFailure(error);
      return this.fallback.getContent(locale);
    }
  }
}

export class CachedPortfolioRepository implements PortfolioRepository {
  private readonly snapshots = new Map<
    Locale,
    { readonly content: PortfolioContent; readonly expiresAt: number }
  >();
  private readonly pending = new Map<Locale, Promise<PortfolioContent>>();

  constructor(
    private readonly repository: PortfolioRepository,
    private readonly ttlMilliseconds: number,
    private readonly now: () => number = Date.now
  ) {
    if (!Number.isFinite(ttlMilliseconds) || ttlMilliseconds < 0) {
      throw new Error('Portfolio cache TTL must be a non-negative finite number');
    }
  }

  async getContent(locale: Locale = defaultLocale): Promise<PortfolioContent> {
    const currentTime = this.now();
    const snapshot = this.snapshots.get(locale);
    if (snapshot && currentTime < snapshot.expiresAt) {
      return snapshot.content;
    }
    const pendingRequest = this.pending.get(locale);
    if (pendingRequest) return pendingRequest;

    const request = this.repository
      .getContent(locale)
      .then(content => {
        this.snapshots.set(locale, {
          content,
          expiresAt: this.now() + this.ttlMilliseconds,
        });
        return content;
      })
      .catch((error: unknown) => {
        const staleSnapshot = this.snapshots.get(locale);
        if (staleSnapshot) return staleSnapshot.content;
        throw error;
      })
      .finally(() => {
        if (this.pending.get(locale) === request) this.pending.delete(locale);
      });

    this.pending.set(locale, request);
    return request;
  }
}
