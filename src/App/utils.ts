import { es, enUS } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

const IS_MOBILE = 'isMobile';
const DEFAULT_PAGE_ITEMS = 'DEFAULT_PAGE_ITEMS';
const DEFAULT_LOCALE = 'DEFAULT_LOCALE';
const OAUTH_CONFIG = 'OAUTH_CONFIG';
const CONFIG = 'CONFIG';

const locales = {
    es: es,
    en: enUS
};

function loadLocale(lang) {
    setDefaultOptions({ locale: locales[lang] });
}

const getLocale = (language) => language.split('-')[0];

export const setConfig = async (config) => {
    localStorage.setItem(CONFIG, JSON.stringify(config));
};

export const getConfig = () => {
    return JSON.parse(localStorage.getItem(CONFIG));
};

export const setOauthConfig = async (config) => {
    localStorage.setItem(OAUTH_CONFIG, config);
};

export const getOauthConfig = () => {
    return JSON.parse(localStorage.getItem(OAUTH_CONFIG));
};

export const setIsMobile = async (isMobile) => {
    localStorage.setItem(IS_MOBILE, isMobile);
};

export const getIsMobile = () => {
    const isMobile = localStorage.getItem(IS_MOBILE);
    return isMobile === 'true';
};

export const setDefaultPageItems = async (items) => {
    localStorage.setItem(DEFAULT_PAGE_ITEMS, items);
};

export const getDefaultPageItems = () => {
    return localStorage.getItem(DEFAULT_PAGE_ITEMS);
};

export const getDefaultLocale = () => {
    return localStorage.getItem(DEFAULT_LOCALE);
};

export const setDefaultLocale = (language) => {
    const locale = getLocale(language);
    if (!localStorage.getItem(DEFAULT_LOCALE)) {
        localStorage.setItem(DEFAULT_LOCALE, locale);
        loadLocale(locale);
    }
};