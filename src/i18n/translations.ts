export type { Language, Translations, BlogPostCopy } from './types';
export type { Language as Lang } from './types';

import type { Language, Translations } from './types';
import { en } from './locales/en';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { es } from './locales/es';
import { sw } from './locales/sw';

const translations: Record<Language, Translations> = {
  EN: en,
  DE: de,
  FR: fr,
  ES: es,
  SW: sw,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.EN;
}

export const AVAILABLE_LANGUAGES: { code: Language; name: string }[] = [
  { code: 'EN', name: 'English' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'SW', name: 'Kiswahili' },
];
