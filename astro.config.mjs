import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@modules': path.resolve('./src/modules'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@shared': path.resolve('./src/modules/shared'),
        '@principal': path.resolve('./src/modules/principal')
      }
    }
  }
});