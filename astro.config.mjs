import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  adapter: awsAmplify({
    runtime: 'nodejs24.x',
    runtimeEnv: [
      'ASTRO_KEY',
      'CONTENT_BUCKET',
      'CONTENT_MANIFEST_KEY',
      'CONTENT_REGION',
      'CONTENT_RUNTIME_CACHE_TTL_SECONDS',
      'CONTACT_MAILER_FUNCTION',
      'CONTACT_REGION',
    ],
    customRules: [
      {
        source: 'https://www.migudev.com',
        target: 'https://migudev.com',
        status: '301',
      },
      { source: '/privacy/', target: '/privacy/index.html', status: '200' },
      { source: '/terms/', target: '/terms/index.html', status: '200' },
    ],
  }),
  integrations: [react()],
  build: {
    inlineStylesheets: 'always',
  },
  output: 'server',
  compressHTML: true,
  security: {
    checkOrigin: true,
    serverIslandBodySizeLimit: 32 * 1024,
  },
  trailingSlash: 'always',
  vite: {
    build: {
      sourcemap: false,
    },
    ssr: {
      noExternal: [
        '@aws-sdk/client-lambda',
        '@aws-sdk/client-s3',
        '@aws-sdk/s3-request-presigner',
        'framer-motion',
        'react',
        'react-dom',
        'zod',
      ],
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
