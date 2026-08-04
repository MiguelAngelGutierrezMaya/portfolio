import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const filenamePattern = /^[a-z0-9][a-z0-9._-]*\.(avif|webp|png|jpe?g)$/i;
const urlLifetimeSeconds = 300;
const managedCollections = {
  companies: 'media/companies/',
  projects: 'media/projects/',
} as const;

export type ManagedMediaCollection = keyof typeof managedCollections;

interface S3ManagedMediaSignerConfig {
  readonly bucket: string;
  readonly region: string;
  readonly collection: ManagedMediaCollection;
}

type Presign = (
  client: S3Client,
  command: GetObjectCommand,
  options: { readonly expiresIn: number }
) => Promise<string>;

export class S3ManagedMediaSigner {
  constructor(
    private readonly config: S3ManagedMediaSignerConfig,
    private readonly client = new S3Client({ region: config.region }),
    private readonly presign: Presign = getSignedUrl
  ) {}

  async createUrl(filename: string): Promise<string> {
    if (!filenamePattern.test(filename)) {
      throw new Error('Invalid managed media filename');
    }

    return this.presign(
      this.client,
      new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: `${managedCollections[this.config.collection]}${filename}`,
      }),
      { expiresIn: urlLifetimeSeconds }
    );
  }
}

const runtimeSigners = new Map<ManagedMediaCollection, S3ManagedMediaSigner>();

export const getRuntimeManagedMediaSigner = (
  collection: ManagedMediaCollection
): S3ManagedMediaSigner => {
  const bucket = process.env.CONTENT_BUCKET ?? import.meta.env.CONTENT_BUCKET;
  if (!bucket) throw new Error('CONTENT_BUCKET is required to serve managed media');

  const existing = runtimeSigners.get(collection);
  if (existing) return existing;

  const signer = new S3ManagedMediaSigner({
    bucket,
    collection,
    region: process.env.CONTENT_REGION ?? import.meta.env.CONTENT_REGION ?? 'us-east-2',
  });
  runtimeSigners.set(collection, signer);
  return signer;
};
