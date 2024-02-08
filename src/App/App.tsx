import { Suspense, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@apollo/client';
import { ConfigProvider, Layout, Card, Spin, Affix } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { GET_CONFIG } from './Queries';
import { GET_IS_LOGGED_IN } from '../Login/queries.ts';
import {
  setIsMobile,
  setDefaultPageItems,
  setDefaultLocale,
  setOauthConfig,
  setConfig,
} from './utils';
import { useTranslation } from 'react-i18next';
import { getBanStatus } from '../Login/authUtils';
import enUS from 'antd/locale/en_US';
import { DirectionType } from 'antd/es/config-provider';

const CONTENT_DIRECTION: DirectionType = 'ltr';

const Navbar = lazy(() => import('../Navbar/Navbar.tsx'));
const AppError = lazy(() => import('./AppError'));
const BanStatusBanner = lazy(() => import('./BanStatusBanner'));

const App = () => {
  const { data, loading, error } = useQuery(GET_CONFIG);
  const { i18n, ready } = useTranslation('', { useSuspense: false });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const loginQuery = useQuery(GET_IS_LOGGED_IN);

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  const isLoggedIn: boolean = loginQuery.data?.loggedIn;

  const banStatus = getBanStatus();
  const { banned } = banStatus;
  const { config, oauth } = data?.config
    ? data.config
    : { config: {}, oauth: {} };
  const {
    description,
    name,
    items_per_page,
    logoURL,
    faviconURL,
    faviconType,
  } = config;

  // Set paramaters.
  setConfig(config);
  setDefaultPageItems(items_per_page);
  setIsMobile(isMobile);
  setOauthConfig(oauth);

  const { language } = i18n;

  if (ready) {
    setDefaultLocale(language);
  }

  // In order to change the background color, override colorBgBase
  const appConfigProps = {
    direction: CONTENT_DIRECTION,
    theme: {
      token: {
        colorBgBase: 'FFFFFF',
        colorPrimary: '0618EC',
      },
    },
    locale: enUS,
  };

  return (
    <HelmetProvider>
      <ConfigProvider {...appConfigProps}>
        <Helmet>
          <link
            rel="icon"
            type={faviconType}
            href={faviconURL}
            data-rh="true"
          />
          <meta name="content-type" content="text/html; charset=UTF-8" />
          <meta name="description" content={description} />
          <title>{name}</title>
        </Helmet>

        <main role="main">
          <Suspense fallback={<Spin />}>
            <Layout data-testid="app-layout">
              <Affix offsetTop={0}>
                <header role="banner">
                  <Navbar
                    isLoading={loading}
                    isError={error !== undefined}
                    mobile={isMobile}
                    name={name}
                    logoURL={logoURL}
                  />
                </header>
              </Affix>
              {error ? (
                <AppError error={error} />
              ) : (
                <div data-testid="content-container">
                  <Card bordered={false}>
                    {isLoggedIn && banned && (
                      <Suspense fallback={<Spin />}>
                        <BanStatusBanner />
                      </Suspense>
                    )}
                    <br />
                    <Suspense fallback={<Spin />}>
                      <Outlet />
                    </Suspense>
                  </Card>
                </div>
              )}
            </Layout>
          </Suspense>
        </main>
      </ConfigProvider>
    </HelmetProvider>
  );
};
export default App;
