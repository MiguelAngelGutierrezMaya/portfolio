import { describe, expect, it } from 'vitest';

import { createManagedMediaDeliveryPath } from './managedMediaPath';

describe('createManagedMediaDeliveryPath', () => {
  it.each([
    ['/media/projects/example.webp', '/media/projects/example'],
    ['/media/companies/example.avif', '/media/companies/example'],
  ])('creates an extensionless compute route for %s', (objectPath, expected) => {
    expect(createManagedMediaDeliveryPath(objectPath)).toBe(expected);
  });

  it('rejects an object path without a managed image extension', () => {
    expect(() => createManagedMediaDeliveryPath('/media/projects/example')).toThrow(
      'Managed media object path must include an image extension'
    );
  });
});
