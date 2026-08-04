import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { S3ManagedMediaSigner } from './S3ManagedMediaSigner';

describe('S3ManagedMediaSigner', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it.each([
    ['projects', 'project.webp', 'media/projects/project.webp'],
    ['companies', 'company.avif', 'media/companies/company.avif'],
  ] as const)('creates a five-minute URL for %s media', async (collection, filename, key) => {
    const presign = vi.fn().mockResolvedValue('https://private-content.s3.amazonaws.com/signed');
    const client = new S3Client({
      region: 'us-east-2',
      credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
    });
    const signer = new S3ManagedMediaSigner(
      { bucket: 'private-content', region: 'us-east-2', collection },
      client,
      presign
    );

    await expect(signer.createUrl(filename)).resolves.toContain('signed');
    expect(presign).toHaveBeenCalledWith(client, expect.any(GetObjectCommand), { expiresIn: 300 });
    expect(presign.mock.calls[0]?.[1].input).toEqual({ Bucket: 'private-content', Key: key });
  });

  it.each(['../secret.png', 'nested/preview.webp', 'preview.svg', ''])(
    'rejects a media path outside the allowlist: %s',
    async filename => {
      const signer = new S3ManagedMediaSigner(
        { bucket: 'private-content', region: 'us-east-2', collection: 'projects' },
        new S3Client({ region: 'us-east-2' }),
        vi.fn()
      );

      await expect(signer.createUrl(filename)).rejects.toThrow('Invalid managed media filename');
    }
  );

  it('requires a bucket in the runtime composition root', async () => {
    vi.stubEnv('CONTENT_BUCKET', '');
    const { getRuntimeManagedMediaSigner } = await import('./S3ManagedMediaSigner');

    expect(() => getRuntimeManagedMediaSigner('projects')).toThrow(
      'CONTENT_BUCKET is required to serve managed media'
    );
  });

  it('reuses one runtime signer per managed collection', async () => {
    vi.stubEnv('CONTENT_BUCKET', 'private-content');
    vi.stubEnv('CONTENT_REGION', 'us-west-2');
    const { getRuntimeManagedMediaSigner } = await import('./S3ManagedMediaSigner');

    expect(getRuntimeManagedMediaSigner('projects')).toBe(getRuntimeManagedMediaSigner('projects'));
    expect(getRuntimeManagedMediaSigner('projects')).not.toBe(
      getRuntimeManagedMediaSigner('companies')
    );
  });
});
