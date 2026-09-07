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
      name: 'name_too_short',
      email: 'email_invalid',
      message: 'message_too_short',
    });
  });

  it('rejects oversized fields before they reach infrastructure', () => {
    const errors = validateContactMessage({
      name: 'M'.repeat(81),
      email: `${'m'.repeat(250)}@example.com`,
      message: 'M'.repeat(4001),
    });

    expect(errors.name).toBe('name_too_long');
    expect(errors.email).toBe('email_too_long');
    expect(errors.message).toBe('message_too_long');
  });
});
