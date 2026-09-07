import { defaultLocale, isLocale, normalizeLocale, type Locale } from '@i18n/domain/Locale';

interface LanguagePreference {
  readonly locale: Locale;
  readonly quality: number;
  readonly position: number;
}

const parseAcceptLanguage = (header: string): readonly LanguagePreference[] =>
  header
    .split(',')
    .map((entry, position) => {
      const [language = '', ...parameters] = entry.trim().split(';');
      const qualityParameter = parameters.find(parameter => parameter.trim().startsWith('q='));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      const languageCode = language.toLowerCase().split('-')[0];

      if (!isLocale(languageCode) || !Number.isFinite(quality) || quality <= 0) return null;
      return { locale: languageCode, quality, position };
    })
    .filter((preference): preference is LanguagePreference => preference !== null)
    .sort((left, right) => right.quality - left.quality || left.position - right.position);

export const resolvePreferredLocale = (
  preferredLocale: string | undefined,
  acceptLanguage: string | null
): Locale => {
  if (preferredLocale) return normalizeLocale(preferredLocale);
  if (!acceptLanguage) return defaultLocale;

  return parseAcceptLanguage(acceptLanguage)[0]?.locale ?? defaultLocale;
};
