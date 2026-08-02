import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@contact': path.resolve(projectRoot, 'src/modules/contact'),
      '@legal': path.resolve(projectRoot, 'src/modules/legal'),
      '@portfolio': path.resolve(projectRoot, 'src/modules/portfolio'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
