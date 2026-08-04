import { createHash } from 'node:crypto';

import { GetObjectCommand, S3Client, type GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { z } from 'zod';

import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';
import { portfolioContentSchema } from '@portfolio/infrastructure/content/PortfolioContentSchema';

const maxManifestBytes = 64 * 1024;
const maxPortfolioBytes = 512 * 1024;

const manifestSchema = z.object({
  schemaVersion: z.literal(1),
  content: z.object({
    portfolio: z.object({
      key: z.string().regex(/^content\/[a-z0-9._/-]+$/i),
      sha256: z.string().regex(/^[a-f0-9]{64}$/i),
    }),
  }),
});

interface S3PortfolioRepositoryConfig {
  readonly bucket: string;
  readonly region: string;
  readonly manifestKey?: string;
}

type S3ObjectReader = Pick<S3Client, 'send'>;

const readObject = async (
  client: S3ObjectReader,
  bucket: string,
  key: string,
  maxBytes: number
): Promise<Uint8Array> => {
  const response = (await client.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  )) as GetObjectCommandOutput;

  const declaredLength = response.ContentLength ?? 0;
  if (declaredLength > maxBytes) {
    throw new Error(`${key} exceeds the ${maxBytes}-byte runtime limit`);
  }
  if (!response.Body) throw new Error(`${key} returned an empty S3 body`);

  const bytes = await response.Body.transformToByteArray();
  if (bytes.byteLength > maxBytes) {
    throw new Error(`${key} exceeds the ${maxBytes}-byte runtime limit`);
  }

  return bytes;
};

export class S3PortfolioRepository implements PortfolioRepository {
  private readonly client: S3ObjectReader;
  private readonly manifestKey: string;

  constructor(
    private readonly config: S3PortfolioRepositoryConfig,
    client: S3ObjectReader = new S3Client({ region: config.region })
  ) {
    this.client = client;
    this.manifestKey = config.manifestKey ?? 'content/manifest.json';

    if (!this.manifestKey.startsWith('content/') || this.manifestKey.includes('..')) {
      throw new Error('The portfolio manifest must stay inside content/');
    }
  }

  async getContent(): Promise<PortfolioContent> {
    const manifestBytes = await readObject(
      this.client,
      this.config.bucket,
      this.manifestKey,
      maxManifestBytes
    );
    const manifest = manifestSchema.parse(
      JSON.parse(new TextDecoder().decode(manifestBytes)) as unknown
    );
    const descriptor = manifest.content.portfolio;

    if (descriptor.key.includes('..')) {
      throw new Error('The portfolio content key must stay inside content/');
    }

    const contentBytes = await readObject(
      this.client,
      this.config.bucket,
      descriptor.key,
      maxPortfolioBytes
    );
    const digest = createHash('sha256').update(contentBytes).digest('hex');
    if (digest !== descriptor.sha256.toLowerCase()) {
      throw new Error(`Integrity check failed for ${descriptor.key}`);
    }

    return portfolioContentSchema.parse(
      JSON.parse(new TextDecoder().decode(contentBytes)) as unknown
    );
  }
}
