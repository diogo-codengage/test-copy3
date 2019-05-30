import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import sanaruiPt from './locales/sanarui/pt'
import sanaruiEn from './locales/sanarui/en'
import esanarPt from './locales/esanar/pt'
import esanarEn from './locales/esanar/en'

const sanaruiI18n = i18n.createInstance()

sanaruiI18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'pt',
        fallbackLng: 'en',
        debug: true,
        resources: {
            pt: {
                sanarui: sanaruiPt,
                esanar: esanarPt
            },
            en: {
                sanarui: sanaruiEn,
                esanar: esanarEn
            }
        },
        interpolation: {
            escapeValue: false
        }
        // react: {
        //     wait: true,
        //     useSuspense: false
        // }
    })

export default sanaruiI18n