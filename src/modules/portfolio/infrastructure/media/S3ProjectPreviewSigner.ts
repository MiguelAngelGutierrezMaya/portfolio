import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const previewFilenamePattern = /^[a-z0-9][a-z0-9._-]*\.(avif|webp|png|jpe?g)$/i;
const urlLifetimeSeconds = 300;

interface S3ProjectPreviewSignerConfig {
  readonly bucket: string;
  readonly region: string;
}

type Presign = (
  client: S3Client,
  command: GetObjectCommand,
  options: { readonly expiresIn: number }
) => Promise<string>;

export class S3ProjectPreviewSigner {
  constructor(
    private readonly config: S3ProjectPreviewSignerConfig,
    private readonly client = new S3Client({ region: config.region }),
    private readonly presign: Presign = getSignedUrl
  ) {}

  async createUrl(filename: string): Promise<string> {
    if (!previewFilenamePattern.test(filename)) {
      throw new Error('Invalid project preview filename');
    }

    return this.presign(
      this.client,
      new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: `media/projects/${filename}`,
      }),
      { expiresIn: urlLifetimeSeconds }
    );
  }
}

let runtimeSigner: S3ProjectPreviewSigner | undefined;

export const getRuntimeProjectPreviewSigner = (): S3ProjectPreviewSigner => {
  const bucket = process.env.CONTENT_BUCKET ?? import.meta.env.CONTENT_BUCKET;
  if (!bucket) throw new Error('CONTENT_BUCKET is required to serve project previews');

  runtimeSigner ??= new S3ProjectPreviewSigner({
    bucket,
    region: process.env.CONTENT_REGION ?? import.meta.env.CONTENT_REGION ?? 'us-east-2',
  });
  return runtimeSigner;
};
