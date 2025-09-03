import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN_common from "./locales/en/common.json";
import translationEN_admin from "./locales/en/admin.json";

import translationVI_common from "./locales/vi/common.json";
import translationVI_admin from "./locales/vi/admin.json";

const resources = {
  en: {
    common: translationEN_common,
    admin: translationEN_admin,
  },
  vi: {
    common: translationVI_common,
    admin: translationVI_admin,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi",
    debug: false,
    ns: ["common", "admin"], // tên các namespace
    defaultNS: "common", // namespace mặc định

    interpolation: {
      escapeValue: false, // react đã xử lý XSS
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
