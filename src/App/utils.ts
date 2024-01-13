import { es, enUS } from 'date-fns/locale';
import { setDefaultOptions, Locale } from 'date-fns';
import type { ConfigType, OAuthConfig } from './types';
const IS_MOBILE = 'isMobile';
const DEFAULT_PAGE_ITEMS = 'DEFAULT_PAGE_ITEMS';
const DEFAULT_LOCALE = 'DEFAULT_LOCALE';
const OAUTH_CONFIG = 'OAUTH_CONFIG';
const CONFIG = 'CONFIG';

const locales: Record<string, Locale> = {
  es: es,
  en: enUS,
};

function loadLocale(lang: string) {
  setDefaultOptions({ locale: locales[lang] });
}

const getLocale = (language: string) => language.split('-')[0];

export const setConfig = async (config: ConfigType) => {
  localStorage.setItem(CONFIG, JSON.stringify(config));
};

export const getConfig = (): ConfigType => {
  return JSON.parse(localStorage.getItem(CONFIG) ?? '{}');
};

export const setOauthConfig = async (config: string) => {
  localStorage.setItem(OAUTH_CONFIG, config);
};

export const getOauthConfig = (): OAuthConfig => {
  return JSON.parse(localStorage.getItem(OAUTH_CONFIG) ?? '{}');
};

export const setIsMobile = async (isMobile: boolean) => {
  localStorage.setItem(IS_MOBILE, isMobile.toString());
};

export const getIsMobile = () => {
  const isMobile = localStorage.getItem(IS_MOBILE);
  return isMobile === 'true';
};

export const setDefaultPageItems = async (items: number) => {
  localStorage.setItem(DEFAULT_PAGE_ITEMS, items.toString());
};

export const getDefaultPageItems = () => {
  return localStorage.getItem(DEFAULT_PAGE_ITEMS);
};

export const getDefaultLocale = () => {
  return localStorage.getItem(DEFAULT_LOCALE);
};

export const setDefaultLocale = (language: string) => {
  const locale = getLocale(language);
  if (!localStorage.getItem(DEFAULT_LOCALE)) {
    localStorage.setItem(DEFAULT_LOCALE, locale);
    loadLocale(locale);
  }
};
