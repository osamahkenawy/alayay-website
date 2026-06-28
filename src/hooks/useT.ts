import { useRouter } from 'next/router';
import { translations, type Locale, type T } from '../locales/translations';

export function useT(): T {
  const { locale } = useRouter();
  return translations[(locale as Locale) ?? 'en'] ?? translations.en;
}

export function useLocale(): Locale {
  const { locale } = useRouter();
  return (locale as Locale) ?? 'en';
}
