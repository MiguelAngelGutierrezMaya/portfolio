import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import {
  CachedPortfolioRepository,
  ResilientPortfolioRepository,
} from '@portfolio/infrastructure/repositories/ResilientPortfolioRepository';
import { ContentFilePortfolioRepository } from '@portfolio/infrastructure/repositories/ContentFilePortfolioRepository';
import { S3PortfolioRepository } from '@portfolio/infrastructure/repositories/S3PortfolioRepository';

interface RuntimePortfolioConfig {
  readonly bucket?: string;
  readonly region?: string;
  readonly manifestKey?: string;
  readonly cacheTtlSeconds?: string;
}

const parseCacheTtl = (value?: string): number => {
  const seconds = value ? Number(value) : 60;
  return Number.isFinite(seconds) && seconds >= 0 ? seconds * 1000 : 60_000;
};

export const createRuntimePortfolioRepository = (
  config: RuntimePortfolioConfig = {
    bucket: process.env.CONTENT_BUCKET ?? import.meta.env.CONTENT_BUCKET,
    region: process.env.CONTENT_REGION ?? import.meta.env.CONTENT_REGION,
    manifestKey: process.env.CONTENT_MANIFEST_KEY ?? import.meta.env.CONTENT_MANIFEST_KEY,
    cacheTtlSeconds:
      process.env.CONTENT_RUNTIME_CACHE_TTL_SECONDS ??
      import.meta.env.CONTENT_RUNTIME_CACHE_TTL_SECONDS,
  }
): PortfolioRepository => {
  const localSnapshot = new ContentFilePortfolioRepository();
  if (!config.bucket) return localSnapshot;

  const remote = new S3PortfolioRepository({
    bucket: config.bucket,
    region: config.region ?? 'us-east-2',
    manifestKey: config.manifestKey,
  });
  const resilient = new ResilientPortfolioRepository(remote, localSnapshot, error => {
    console.warn('Runtime portfolio content unavailable; serving the bundled snapshot.', error);
  });

  return new CachedPortfolioRepository(resilient, parseCacheTtl(config.cacheTtlSeconds));
};

let runtimeRepository: PortfolioRepository | undefined;

export const getRuntimePortfolioRepository = (): PortfolioRepository => {
  runtimeRepository ??= createRuntimePortfolioRepository();
  return runtimeRepository;
};
