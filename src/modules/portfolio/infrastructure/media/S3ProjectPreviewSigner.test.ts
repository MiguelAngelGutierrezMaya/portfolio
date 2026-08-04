import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { S3ProjectPreviewSigner } from './S3ProjectPreviewSigner';

describe('S3ProjectPreviewSigner', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('creates a five-minute URL for the allowlisted project prefix', async () => {
    const presign = vi.fn().mockResolvedValue('https://private-content.s3.amazonaws.com/signed');
    const client = new S3Client({
      region: 'us-east-2',
      credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
    });
    const signer = new S3ProjectPreviewSigner(
      { bucket: 'private-content', region: 'us-east-2' },
      client,
      presign
    );

    await expect(signer.createUrl('project.webp')).resolves.toContain('signed');
    expect(presign).toHaveBeenCalledWith(client, expect.any(GetObjectCommand), { expiresIn: 300 });
    expect(presign.mock.calls[0]?.[1].input).toEqual({
      Bucket: 'private-content',
      Key: 'media/projects/project.webp',
    });
  });

  it.each(['../secret.png', 'nested/preview.webp', 'preview.svg', ''])(
    'rejects a preview path outside the allowlist: %s',
    async filename => {
      const signer = new S3ProjectPreviewSigner(
        { bucket: 'private-content', region: 'us-east-2' },
        new S3Client({ region: 'us-east-2' }),
        vi.fn()
      );

      await expect(signer.createUrl(filename)).rejects.toThrow('Invalid project preview filename');
    }
  );

  it('requires a bucket in the runtime composition root', async () => {
    vi.stubEnv('CONTENT_BUCKET', '');
    const { getRuntimeProjectPreviewSigner } = await import('./S3ProjectPreviewSigner');

    expect(() => getRuntimeProjectPreviewSigner()).toThrow(
      'CONTENT_BUCKET is required to serve project previews'
    );
  });

  it('reuses the runtime signer configured through the environment', async () => {
    vi.stubEnv('CONTENT_BUCKET', 'private-content');
    vi.stubEnv('CONTENT_REGION', 'us-west-2');
    const { getRuntimeProjectPreviewSigner } = await import('./S3ProjectPreviewSigner');

    expect(getRuntimeProjectPreviewSigner()).toBe(getRuntimeProjectPreviewSigner());
  });
});
