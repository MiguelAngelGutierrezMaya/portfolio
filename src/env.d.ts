/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_EMAIL_SERVICE_ID?: string;
  readonly PUBLIC_EMAIL_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAIL_URL?: string;
  readonly PUBLIC_EMAIL_USER_ID?: string;
  readonly PUBLIC_FACEBOOK_DOMAIN_VERIFICATION?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
