/// <reference path="../.astro/types.d.ts" />
// Import Astro types
import type {} from 'astro/client';
import type {} from '../.astro/types';

// Define environment variables for TypeScript
interface ImportMetaEnv {
  readonly PUBLIC_EMAIL_SERVICE_ID: string;
  readonly PUBLIC_EMAIL_TEMPLATE_ID: string;
  readonly PUBLIC_EMAIL_USER_ID: string;
  readonly PUBLIC_FIREBASE_URL: string;
  readonly PUBLIC_FACEBOOK_DOMAIN_VERIFICATION: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
