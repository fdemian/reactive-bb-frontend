import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    fallbackLng: false,
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      crossDomain: true,
      allowMultiLoading: true,
      loadPath: '/api/locales/{{lng}}/{{ns}}.json',
      addPath: '/api/locales/{{lng}}/{{ns}}.missing.json', // path to post missing resources
      lng: 'en',
      fallbackLng: false,
      preload: ['en', 'es'],
    },
  });

export default i18n;
