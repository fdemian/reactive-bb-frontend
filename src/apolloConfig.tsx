import { ApolloClient, ApolloLink, split , ServerError} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';
import { cache } from './cache';
import { refreshToken } from './Login/authUtils';

const redirectToLogout = () => {
    const newURL = window.location.origin + '/logout';
    const from = window.location.pathname === 'logout' ? '' : window.location.pathname;
    window.location.replace(newURL + '?from=' + from);
};

const eraseUserTokensAndLogout = async (url:string, host:string, protocol:string) => {
    if (url.indexOf('logout') === -1) {
        await fetch(`${protocol}//${host}/api/logout`, { method: 'POST' });
        redirectToLogout();
    }
};

const getWSURL = ():string => {
    const host = window.location.host;
    const port = '8000';
    const isLocalhost = host.toString().includes('localhost');

    if (isLocalhost) return `ws://localhost:${port}/api/subscriptions`;

    return 'wss://' + host + '/api/subscriptions';
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors){
        graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
        );   
    }

        if (networkError && networkError.name === "ServerError") {
        const errorParsed:ServerError = networkError as ServerError;
        const { statusCode } = errorParsed;
        const { href, host, protocol } = window.location;
        if (statusCode === 412) {
            eraseUserTokensAndLogout(href, host, protocol);
            const onFail = () => eraseUserTokensAndLogout(href, host, protocol);
            refreshToken(onFail);
        }
    }
});

const httpLink = createUploadLink({ uri: '/api/graphql' });
const wsLink = new GraphQLWsLink(createClient({ url: getWSURL() }));

const enhancedHttpLink = ApolloLink.from([errorLink, httpLink]);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
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
