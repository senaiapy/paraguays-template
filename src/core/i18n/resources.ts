import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import pt from '@/translations/pt.json';

export const resources = {
  es: {
    translation: es,
  },
  pt: {
    translation: pt,
  },
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
