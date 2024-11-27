import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import fr from '@/translations/fr.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
};

export type Language = keyof typeof resources;
