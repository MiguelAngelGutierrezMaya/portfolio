/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTENT_BUCKET?: string;
  readonly CONTENT_MANIFEST_KEY?: string;
  readonly CONTENT_REGION?: string;
  readonly CONTENT_RUNTIME_CACHE_TTL_SECONDS?: string;
  readonly PUBLIC_EMAIL_SERVICE_ID?: string;
  readonly PUBLIC_EMAIL_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAIL_URL?: string;
  readonly PUBLIC_EMAIL_USER_ID?: string;
  readonly PUBLIC_FACEBOOK_DOMAIN_VERIFICATION?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_WEB_VITALS_ENDPOINT?: string;
}

interface Window {
  __PORTFOLIO_WEB_VITALS__?: Partial<
    Record<
      string,
      {
        readonly delta: number;
        readonly id: string;
        readonly name: string;
        readonly navigationType: string;
        readonly rating: string;
        readonly value: number;
      }
    >
  >;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
