import es from '@/translations/es.json';
import fr from '@/translations/fr.json';

export const resources = {
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
};

export type Language = keyof typeof resources;
