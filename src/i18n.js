import i18n from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import languageEN from './locale/en/translate.json';
import languageBN from './locale/bn/translate.json';

i18n
.use(XHR)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: languageEN,
        bn: languageBN
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
        useSuspense : true,
    }
})

export default i18n;
