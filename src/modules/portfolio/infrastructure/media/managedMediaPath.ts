const managedExtensionPattern = /\.(avif|webp|png|jpe?g)$/i;

export const createManagedMediaDeliveryPath = (objectPath: string): string => {
  if (!managedExtensionPattern.test(objectPath)) {
    throw new Error('Managed media object path must include an image extension');
  }

  return objectPath.replace(managedExtensionPattern, '');
};
