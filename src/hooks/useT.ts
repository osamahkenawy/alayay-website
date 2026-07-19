import { useRouter } from 'next/router';
import { translations, type Locale, type T } from '../locales/translations';
import { useCms, deepMerge } from '../contexts/cms';

export function useT(): T {
  const { locale } = useRouter();
  const base = translations[(locale as Locale) ?? 'en'] ?? translations.en;
  const cms = useCms();
  // Overlay CMS text onto the base translations (fallback-safe deep merge).
  return deepMerge(base, cms.t);
}

export function useLocale(): Locale {
  const { locale } = useRouter();
  return (locale as Locale) ?? 'en';
}
