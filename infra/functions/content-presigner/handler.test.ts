import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { describe, expect, it, vi } from 'vitest';

import { createContentPresigner } from './handler';

describe('content presigner Lambda', () => {
  it.each([
    'content/manifest.json',
    'content/portfolio.json',
    'media/brand/logo.webp',
    'media/profile/portrait.png',
    'media/projects/example.webp',
  ])('creates a five-minute signed download for %s', async key => {
    const presign = vi.fn().mockResolvedValue(`https://content.example/${key}`);
    const client = new S3Client({
      region: 'us-east-2',
      credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
    });
    const handler = createContentPresigner({
      bucket: 'private-content',
      region: 'us-east-2',
      client,
      presign,
    });

    await expect(handler({ key })).resolves.toEqual({
      url: `https://content.example/${key}`,
      expiresIn: 300,
    });
    expect(presign).toHaveBeenCalledWith(client, expect.any(GetObjectCommand), { expiresIn: 300 });
    expect(presign.mock.calls[0]?.[1].input).toEqual({
      Bucket: 'private-content',
      Key: key,
    });
  });

  it.each([undefined, '', '../secret', 'other/file.json', 'content/../secret', 'content\\file'])(
    'rejects an unmanaged key: %s',
    async key => {
      const handler = createContentPresigner({
        bucket: 'private-content',
        region: 'us-east-2',
        presign: vi.fn(),
      });

      await expect(handler({ key })).rejects.toThrow('Content key is outside the managed prefixes');
    }
  );

  it('fails during initialization when the bucket is missing', () => {
    expect(() => createContentPresigner({ bucket: '', region: 'us-east-2' })).toThrow(
      'CONTENT_BUCKET is required'
    );
  });
});
