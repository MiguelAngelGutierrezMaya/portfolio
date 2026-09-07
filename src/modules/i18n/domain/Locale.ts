export const supportedLocales = ['en', 'es'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'en';

export const isLocale = (value: string | undefined | null): value is Locale =>
  supportedLocales.includes(value as Locale);

export const normalizeLocale = (value: string | undefined | null): Locale =>
  value?.trim().toLowerCase().split('-')[0] === 'es' ? 'es' : defaultLocale;

export type LocalizedPage = 'home' | 'privacy' | 'terms';

export const localizedRoutes: Record<Locale, Record<LocalizedPage, string>> = {
  en: {
    home: '/en/',
    privacy: '/privacy/',
    terms: '/terms/',
  },
  es: {
    home: '/es/',
    privacy: '/es/privacy/',
    terms: '/es/terms/',
  },
};
