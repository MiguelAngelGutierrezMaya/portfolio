import { describe, expect, it } from 'vitest';

import { StaticLegalRepository } from '@legal/infrastructure/repositories/StaticLegalRepository';

import { GetLegalDocument } from './GetLegalDocument';

describe('GetLegalDocument', () => {
  const repository = new StaticLegalRepository();

  it.each([
    ['privacy', 'Privacy Policy'],
    ['terms', 'Terms of Use'],
  ] as const)('returns the %s document', (key, title) => {
    const document = GetLegalDocument.execute(repository, key);

    expect(document.title).toBe(title);
    expect(document.sections.length).toBeGreaterThan(0);
    expect(document.lastUpdated).toBeTruthy();
  });
});
