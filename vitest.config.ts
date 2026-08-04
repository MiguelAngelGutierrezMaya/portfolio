import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, 'src'),
      '@contact': path.resolve(projectRoot, 'src/modules/contact'),
      '@legal': path.resolve(projectRoot, 'src/modules/legal'),
      '@portfolio': path.resolve(projectRoot, 'src/modules/portfolio'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}', 'infra/**/*.test.ts'],
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: [
        'src/modules/**/application/**/*.ts',
        'src/modules/**/domain/**/*.ts',
        'src/modules/**/infrastructure/gateways/**/*.ts',
        'src/modules/**/infrastructure/repositories/**/*.ts',
        'src/modules/**/infrastructure/media/**/*.ts',
        'infra/functions/**/*.ts',
      ],
      exclude: ['src/**/*.test.{ts,tsx}'],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
