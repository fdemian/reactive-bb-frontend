/* eslint react-refresh/only-export-components: 0 */  //
import PropTypes from 'prop-types';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { Context as ResponsiveContext } from 'react-responsive';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import cache from '../cache';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GET_CONFIG } from '../App/Queries';
import { GET_USER } from '../Navbar/Queries';

const _user = {
    id: 1,
    username: 'adminuser',
    avatar: 'avatar.png',
    banned: false,
    banReason: null,
    type: 'U'
};

// Config settings.
const configSettingsMock = [
    {
        request: {
            query: GET_USER,
            variables: {
                id: 1
            }
        },
        result: {
            loading: false,
            error: false,
            data: { getUser: _user }
        }
    },
    {
        request: {
            query: GET_CONFIG,
            variables: {}
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
                        logoURL: "", 
                        faviconURL: "",
                        faviconType: ""
                    },
                    oauth: JSON.parse('{"services":[{"name":"google","scope":"email profile","clientId":"<CLIENT_ID>","link":"https://accounts.google.com/o/oauth2/v2/auth","extraParams":"&prompt=consent&access_type=offline"},{"name":"github","scope":"user:email","clientId":"<CLIENT_ID>","link":"https://github.com/login/oauth/authorize","extraParams":""}],"redirectURI":"www.redirect.com"}')
                }
            }
        }
    }
];

const TestingWrapper = (props) => {
    const { isMobile, children, mocks, isLoggedIn, configMockOverride } = props;

    const resolvers = {
        Query: {
            loggedIn() {
                return isLoggedIn ? true : false;
            }
        }
    };

    const configMock = configMockOverride ? configMockOverride : configSettingsMock;
    const _mocks = mocks ? mocks.concat(configMock) : configMock;

    return (
        <I18nextProvider i18n={i18n}>
            <ResponsiveContext.Provider value={{ width: isMobile ? 300 : 1900 }}>
                <MockedProvider
                    mocks={_mocks}
                    cache={cache}
                    resolvers={resolvers}
                    addTypename={true}
                >
                    {children}
                </MockedProvider>
            </ResponsiveContext.Provider>
        </I18nextProvider>
    );
};

TestingWrapper.propTypes = {
    isMobile: PropTypes.bool,
    children: PropTypes.any,
    mocks: PropTypes.arrayOf({
      request: PropTypes.shape({
          query: PropTypes.any,
          variables: PropTypes.any
      }),
      result: PropTypes.shape({
          loading: PropTypes.bool,
          error: PropTypes.bool,
          data: PropTypes.any
      })
    }),
    isLoggedIn: PropTypes.bool,
    configMockOverride: PropTypes.shape({
    })
};


const customRender = (ui, options) => {
    return render(ui, {
        wrapper: (props) => <TestingWrapper {...options} >{props.children}</TestingWrapper>
    });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };