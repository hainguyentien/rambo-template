import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EN } from './en';

const initI18n = () => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: EN,
      },
    },
  });
};

export default initI18n;
