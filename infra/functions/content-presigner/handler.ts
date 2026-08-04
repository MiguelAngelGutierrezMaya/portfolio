import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Handler } from 'aws-lambda';

const urlLifetimeSeconds = 300;
const allowedPrefixes = [
  'content/',
  'media/brand/',
  'media/companies/',
  'media/profile/',
  'media/projects/',
];

interface ContentPresignerEvent {
  readonly key?: unknown;
}

interface ContentPresignerResult {
  readonly url: string;
  readonly expiresIn: number;
}

type ContentPresigner = (event: ContentPresignerEvent) => Promise<ContentPresignerResult>;

interface ContentPresignerDependencies {
  readonly bucket: string;
  readonly region: string;
  readonly client?: S3Client;
  readonly presign?: (
    client: S3Client,
    command: GetObjectCommand,
    options: { readonly expiresIn: number }
  ) => Promise<string>;
}

const validateKey = (key: unknown): string => {
  if (
    typeof key !== 'string' ||
    key.length === 0 ||
    key.includes('..') ||
    key.includes('\\') ||
    !allowedPrefixes.some(prefix => key.startsWith(prefix))
  ) {
    throw new Error('Content key is outside the managed prefixes');
  }

  return key;
};

export const createContentPresigner = ({
  bucket,
  region,
  client = new S3Client({ region }),
  presign = getSignedUrl,
}: ContentPresignerDependencies): ContentPresigner => {
  if (!bucket) throw new Error('CONTENT_BUCKET is required');

  return async event => {
    const key = validateKey(event?.key);
    const url = await presign(client, new GetObjectCommand({ Bucket: bucket, Key: key }), {
      expiresIn: urlLifetimeSeconds,
    });

    return { url, expiresIn: urlLifetimeSeconds };
  };
};

let runtimeHandler: ContentPresigner | undefined;

export const handler: Handler<ContentPresignerEvent, ContentPresignerResult> = async event => {
  runtimeHandler ??= createContentPresigner({
    bucket: process.env.CONTENT_BUCKET ?? '',
    region: process.env.AWS_REGION ?? 'us-east-2',
  });

  return runtimeHandler(event);
};
