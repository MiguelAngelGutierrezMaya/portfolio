import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  output: 'static',
  compressHTML: true,
  vite: {
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, 'src'),
        '@contact': path.resolve(projectRoot, 'src/modules/contact'),
        '@layouts': path.resolve(projectRoot, 'src/layouts'),
        '@legal': path.resolve(projectRoot, 'src/modules/legal'),
        '@portfolio': path.resolve(projectRoot, 'src/modules/portfolio'),
        '@styles': path.resolve(projectRoot, 'src/styles'),
      },
    },
  },
});
