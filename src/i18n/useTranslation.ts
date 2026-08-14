import { createContext, useContext } from 'react';
import { Language, getTranslations, Translations } from './translations';

interface TranslationContextType {
  currentLang: Language;
  t: Translations;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}

export function createTranslationContext(lang: Language): TranslationContextType {
  return {
    currentLang: lang,
    t: getTranslations(lang),
  };
}
