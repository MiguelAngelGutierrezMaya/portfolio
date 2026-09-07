import { describe, expect, it } from 'vitest';

import { resolvePreferredLocale } from './resolvePreferredLocale';

describe('resolvePreferredLocale', () => {
  it.each([
    ['es', 'en-US,en;q=0.9', 'es'],
    [undefined, 'es-CO,es;q=0.9,en;q=0.8', 'es'],
    [undefined, 'en-US,en;q=0.9', 'en'],
    [undefined, 'fr-FR,fr;q=0.9', 'en'],
    [undefined, null, 'en'],
  ] as const)('resolves %s and %s to %s', (preferredLocale, acceptLanguage, expected) => {
    expect(resolvePreferredLocale(preferredLocale, acceptLanguage)).toBe(expected);
  });
});
