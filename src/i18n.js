import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import intervalPlural from 'i18next-intervalplural-postprocessor';
import resources from './languages/index.js';

export default async () => {
  const instance =i18n.createInstance();
  await instance
    .use(intervalPlural)
    .use(initReactI18next)
    .init({
      resources,
      lng: "ru",
      debug: false,
      interpolation: {
        escapeValue: false
      }
    });
  return instance;
};
