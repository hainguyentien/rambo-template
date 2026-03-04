import { i18n } from '@lingui/core';
import { messages as enMessages } from '@/locales/en/messages';

const catalogs = {
  en: enMessages,
} as const;

let initialized = false;

const initI18n = () => {
  if (initialized) {
    return;
  }

  Object.entries(catalogs).forEach(([locale, messages]) => {
    i18n.load(locale, messages);
  });

  i18n.activate('en');
  initialized = true;
};

export type LanguagesKeys = keyof typeof catalogs;
export const setLocale = (locale: LanguagesKeys) => i18n.activate(locale);
export { i18n };

export default initI18n;
