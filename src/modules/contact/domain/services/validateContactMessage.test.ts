import { describe, expect, it } from 'vitest';

import { validateContactMessage } from './validateContactMessage';

describe('validateContactMessage', () => {
  it('accepts a complete contact message', () => {
    expect(
      validateContactMessage({
        name: 'Miguel',
        email: 'miguel@example.com',
        message: 'I would like to discuss a product engineering project.',
      })
    ).toEqual({});
  });

  it('returns field-level errors for invalid input', () => {
    expect(validateContactMessage({ name: 'M', email: 'invalid', message: 'Too short' })).toEqual({
      name: 'Please enter at least two characters.',
      email: 'Please enter a valid email address.',
      message: 'Tell me a little more — at least 20 characters.',
    });
  });

  it('rejects oversized fields before they reach infrastructure', () => {
    const errors = validateContactMessage({
      name: 'M'.repeat(81),
      email: `${'m'.repeat(250)}@example.com`,
      message: 'M'.repeat(4001),
    });

    expect(errors.name).toContain('under 80');
    expect(errors.email).toBe('Please enter a shorter email address.');
    expect(errors.message).toContain('under 4000');
  });
});
