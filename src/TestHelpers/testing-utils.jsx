/* eslint no-unused-vars: 0 */ //
/* eslint react-refresh/only-export-components: 0 */ //
//import PropTypes from 'prop-types';
import React from 'react';
import { MockedProvider } from "@apollo/client/testing/react";
import { Context as ResponsiveContext } from 'react-responsive';
import { RouterProvider, createRoutesStub, createMemoryRouter } from "react-router";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GET_CONFIG } from '../App/Queries';
import routes from '../Routes/RoutesForTesting';
import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_SUBSCRIPTION,
} from '../Navbar/Queries';
import { GET_USER } from '../User/Queries';
import { GET_ALL_CHATS } from '../Messages/Queries';
import Loading from '../Loading/LoadingIndicator';
import { InMemoryCache } from '@apollo/client';
import { vi } from 'vitest';

global.ResizeObserver = class FakeResizeObserver {

  observe() {
    return vi.fn();
  }
  disconnect() {
    return vi.fn()
  }

  unobserve() {
    return vi.fn();
  }
};

vi.mock('react-router-dom', async () => {
  const actualDom = await vi.importActual('react-router');
  return {
    ...actualDom,
    __esModule: true,
    useNavigate: vi.fn()
  };
});

/*
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Import the actual module to get other exports
  return {
    ...actual, // Spread the actual exports to keep other functionalities
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
    Outlet: (props) => {
      console.log("dfdfdfasfdsfdfsa------->>>>>>");
      console.log(props);
      console.log("@@@@@@====");
      return(<div data-testid="mock-outlet">settings</div>);
    }, // Mocked Outlet
  };
});
*/

const navbarMocks = [
  {
    request: {
      query: GET_USER,
      variables: {
        id: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        getUser: {
          id: 1,
          username: 'User',
          avatar: null,
          type: 'u',
          banned: false,
          banReason: null,
        },
      },
    },
  },
  {
    request: {
      query: GET_ALL_CHATS,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: {
        chatsByUser: [],
      },
    },
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: { notifications: [] },
    },
  },
  {
    request: {
      query: GET_NOTIFICATIONS,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: { notifications: [] },
    },
  },
  {
    request: {
      query: NOTIFICATIONS_SUBSCRIPTION,
      variables: {
        user: 1,
      },
    },
    result: {
      loading: false,
      error: false,
      data: { notificationAdded: null },
    },
  },
];

const TestingWrapper = (props) => {
  const { isMobile, mocks, initialEntries, isLoggedIn, configMockOverride } =
    props;
  
  const configRequestMock = {
    request: {
      query: GET_CONFIG,
      variables: {},
    },
    result: {
      loading: false,
      error: false,
      data: {
        config: {
          config: {
            name: 'Morpheus',
            description: 'This is a forum',
            items_per_page: '5',
            logoURL: '',
            faviconURL: '',
            faviconType: '',
          },
          oauth:
            '{"services":[{"name":"google","scope":"email profile","clientId":"<CLIENT_ID>","link":"https://accounts.google.com/o/oauth2/v2/auth","extraParams":"&prompt=consent&access_type=offline"},{"name":"github","scope":"user:email","clientId":"<CLIENT_ID>","link":"https://github.com/login/oauth/authorize","extraParams":""}],"redirectURI":"www.redirect.com"}'
          ,
        },
      },
    },
  };

  // Config settings.
  let configSettingsMock = [];
  for (var i = 0; i < 100; i++) {
    configSettingsMock.push(configRequestMock);
  }

  const Stub = createRoutesStub(routes);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          loggedIn: {
            read() {
              return isLoggedIn;
            },
          },
        },
      },
    },
  });

  const configMock = configMockOverride
    ? configMockOverride
    : configSettingsMock;
  const providerMocks = mocks ? mocks.concat(configMock) : configMock;
  const finalMocks = providerMocks.concat(navbarMocks);

  return (
  <HelmetProvider>
    <I18nextProvider i18n={i18n}>
      <ResponsiveContext.Provider value={{ width: isMobile ? 300 : 1900 }}>
        <MockedProvider
          mocks={finalMocks}
          cache={cache}
          addTypename={true}
        >
          <Stub initialEntries={initialEntries} hydrateFallbackElement={<Loading />} />
        </MockedProvider>
      </ResponsiveContext.Provider>
    </I18nextProvider>
  </HelmetProvider>
  );
};

/*
TestingWrapper.propTypes = {
  isMobile: PropTypes.bool,
  initialEntries: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.any,
  mocks: PropTypes.arrayOf(
    PropTypes.shape({
      request: PropTypes.shape({
        query: PropTypes.any,
        variables: PropTypes.any,
      }),
      result: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.bool,
        data: PropTypes.any,
      }),
    })
  ),
  isLoggedIn: PropTypes.bool,
  configMockOverride: PropTypes.shape({}),
};*/

const customRender = (options) => {
  return render(<div></div>, {
    wrapper: (_) => <TestingWrapper {...options} />,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
