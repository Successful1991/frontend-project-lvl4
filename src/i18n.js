import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resources from './languages/index.js';

i18n
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
