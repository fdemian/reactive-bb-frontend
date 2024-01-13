import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
/*
import accountSettings from './translations/accountSettings.json';
import bookmarks from './translations/bookmarks.json';
import categories from './translations/categories.json';
import category from './translations/category.json';
import oauth from './translations/oauth.json';
import login from './translations/login.json';
import logout from './translations/logout.json';
import navbar from './translations/navbar.json';
import paginationFooter from './translations/paginationFooter.json';
import postLink from './translations/postLink.json';
import posts from './translations/posts.json';
import register from './translations/register.json';
import topics from './translations/topics.json';
import topicsComposer from './translations/topicsComposer.json';
import user from './translations/user.json';
import editor from './translations/editor.json';*/
/*accountSettings: accountSettings,
    bookmarks: bookmarks,
    categories: categories,
    category: category,
    oauth: oauth,
    login: login,
    logout: logout,
    navbar: navbar,
    paginationFooter: paginationFooter,
    postLink: postLink,
    posts: posts,
    register: register,
    topics: topics,
    topicsComposer: topicsComposer,
    user: user,
    editor: editor
*/

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {},
  },
});

export default i18n;
