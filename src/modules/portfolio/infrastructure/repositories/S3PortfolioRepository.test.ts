import { createHash } from 'node:crypto';

import { GetObjectCommand, type S3Client } from '@aws-sdk/client-s3';
import { describe, expect, it, vi } from 'vitest';

import portfolioSource from '@/content/portfolio.json';

import { S3PortfolioRepository } from './S3PortfolioRepository';

const body = (value: string) => ({
  transformToByteArray: vi.fn().mockResolvedValue(new TextEncoder().encode(value)),
});

describe('S3PortfolioRepository', () => {
  it('loads the release manifest, verifies integrity and validates portfolio content', async () => {
    const portfolioJson = JSON.stringify(portfolioSource);
    const sha256 = createHash('sha256').update(portfolioJson).digest('hex');
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        Body: body(
          JSON.stringify({
            schemaVersion: 1,
            content: { portfolio: { key: 'content/portfolio.json', sha256 } },
          })
        ),
      })
      .mockResolvedValueOnce({ Body: body(portfolioJson) });
    const repository = new S3PortfolioRepository(
      { bucket: 'private-content', region: 'us-east-2' },
      { send } as unknown as Pick<S3Client, 'send'>
    );

    await expect(repository.getContent()).resolves.toMatchObject({
      profile: { brandName: 'Migudev' },
    });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0]?.[0]).toBeInstanceOf(GetObjectCommand);
    expect(send.mock.calls[0]?.[0].input).toMatchObject({
      Bucket: 'private-content',
      Key: 'content/manifest.json',
    });
    expect(send.mock.calls[1]?.[0].input.Key).toBe('content/portfolio.json');
  });

  it('rejects content that does not match the release digest', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({
        Body: body(
          JSON.stringify({
            schemaVersion: 1,
            content: {
              portfolio: { key: 'content/portfolio.json', sha256: 'a'.repeat(64) },
            },
          })
        ),
      })
      .mockResolvedValueOnce({ Body: body(JSON.stringify(portfolioSource)) });
    const repository = new S3PortfolioRepository(
      { bucket: 'private-content', region: 'us-east-2' },
      { send } as unknown as Pick<S3Client, 'send'>
    );

    await expect(repository.getContent()).rejects.toThrow('Integrity check failed');
  });
});
