import type { ResourceLanguage } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

const resources = {
  en,
} as const;

const newResources = Object.keys(resources).reduce(
  (acc, k) => {
    const key = k as keyof typeof resources;
    acc[key] = { ...resources[key] };
    return acc;
  },
  {} as Record<keyof typeof resources, ResourceLanguage>
);

const initI18n = () => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    resources: newResources,
  });
};

export type LanguagesKeys = keyof typeof resources;

export default initI18n;
