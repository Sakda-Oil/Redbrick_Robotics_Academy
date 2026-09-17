import thTranslations from "@/locales/th.json";
import enTranslations from "@/locales/en.json";
import { SupportedLocale } from "./store/progressStore";

export type TranslationDictionary = typeof thTranslations;

export const translations: Record<SupportedLocale, TranslationDictionary> = {
  th: thTranslations,
  en: enTranslations,
};

export function getTranslation(locale: SupportedLocale): TranslationDictionary {
  return translations[locale] || translations.th;
}
