import { ApolloClient, ApolloLink } from '@apollo/client';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ErrorLink } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';
import { cache } from './cache';
import { refreshToken } from './Login/authUtils';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  LocalStateError,
  ServerError,
  ServerParseError,
  UnconventionalError,
} from '@apollo/client/errors';
import { notification } from 'antd';

const redirectToLogout = () => {
  const newURL = window.location.origin + '/logout';
  const from =
    window.location.pathname === 'logout' ? '' : window.location.pathname;
  window.location.replace(newURL + '?from=' + from);
};

const eraseUserTokensAndLogout = async (
  url: string,
  host: string,
  protocol: string
) => {
  if (!url.includes('logout')) {
    await fetch(`${protocol}//${host}/api/logout`, { method: 'POST' });
    redirectToLogout();
  }
};

const getWSURL = (): string => {
  const host = window.location.host;
  const port = '8000';
  const isLocalhost = host.toString().includes('localhost');

  if (isLocalhost) return `ws://localhost:${port}/api/subscriptions`;

  return 'wss://' + host + '/api/subscriptions';
};

// Comprehensive error handling example.
const handleError = (error: unknown) => {
  if (CombinedGraphQLErrors.is(error)) {
    // Handle GraphQL errors
    const messages = error.errors.map((e) => e.message);
    const [api, _] = notification.useNotification();
    for (const message of messages) {
      //
      api.open({
        message: message,
        description: 'GraphQL Error',
        duration: 0,
      });
    }

    if (messages.includes('Invalid auth credentials.')) {
      const { href, host, protocol } = window.location;
      eraseUserTokensAndLogout(href, host, protocol);
      const onFail = () => {
        eraseUserTokensAndLogout(href, host, protocol);
        return;
      };
      refreshToken(onFail);
    }
  } else if (CombinedProtocolErrors.is(error)) {
    // Handle multipart subscription protocol errors
  } else if (LocalStateError.is(error)) {
    // Handle errors thrown by the `LocalState` class
  } else if (ServerError.is(error)) {
    // Handle server HTTP errors
    const { statusCode } = error;
    const { href, host, protocol } = window.location;
    if (statusCode === 412) {
      eraseUserTokensAndLogout(href, host, protocol);
      const onFail = () => {
        eraseUserTokensAndLogout(href, host, protocol);
        return;
      };
      refreshToken(onFail);
    } else if (ServerParseError.is(error)) {
      // Handle JSON parse errors
    } else if (UnconventionalError.is(error)) {
      // Handle errors thrown by irregular types
    } else {
      // Handle other errors
    }
  }
};

const errorLink = new ErrorLink(({ error }) => {
  handleError(error);
});
const httpLink = new UploadHttpLink({ uri: '/api/graphql' });
const wsLink = new GraphQLWsLink(createClient({ url: getWSURL() }));

const enhancedHttpLink = ApolloLink.from([errorLink, httpLink]);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  enhancedHttpLink
);

export const useNewClient = () => {
  return new ApolloClient({
    link: splitLink,
    cache: cache,
  });
};
