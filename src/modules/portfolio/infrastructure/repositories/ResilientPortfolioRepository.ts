import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

type FailureReporter = (error: unknown) => void;

export class ResilientPortfolioRepository implements PortfolioRepository {
  constructor(
    private readonly primary: PortfolioRepository,
    private readonly fallback: PortfolioRepository,
    private readonly reportFailure: FailureReporter = () => undefined
  ) {}

  async getContent(): Promise<PortfolioContent> {
    try {
      return await this.primary.getContent();
    } catch (error: unknown) {
      this.reportFailure(error);
      return this.fallback.getContent();
    }
  }
}

export class CachedPortfolioRepository implements PortfolioRepository {
  private snapshot?: { readonly content: PortfolioContent; readonly expiresAt: number };
  private pending?: Promise<PortfolioContent>;

  constructor(
    private readonly repository: PortfolioRepository,
    private readonly ttlMilliseconds: number,
    private readonly now: () => number = Date.now
  ) {
    if (!Number.isFinite(ttlMilliseconds) || ttlMilliseconds < 0) {
      throw new Error('Portfolio cache TTL must be a non-negative finite number');
    }
  }

  async getContent(): Promise<PortfolioContent> {
    const currentTime = this.now();
    if (this.snapshot && currentTime < this.snapshot.expiresAt) {
      return this.snapshot.content;
    }
    if (this.pending) return this.pending;

    const request = this.repository
      .getContent()
      .then(content => {
        this.snapshot = { content, expiresAt: this.now() + this.ttlMilliseconds };
        return content;
      })
      .catch((error: unknown) => {
        if (this.snapshot) return this.snapshot.content;
        throw error;
      })
      .finally(() => {
        if (this.pending === request) this.pending = undefined;
      });

    this.pending = request;
    return request;
  }
}
