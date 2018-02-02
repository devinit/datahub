// @flow
import fetch from 'isomorphic-fetch';
import { config } from 'package.json';
import { ApolloClient, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-client-preset';
import introspectionQueryResultData from './graphql/fragmentTypes.json';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const cache = () => new InMemoryCache({
  dataIdFromObject: (obj) => obj.uid,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
});


export function create(initialState?: Object): ApolloClient {
  return new ApolloClient({
    connectToDevTools: process.browser,
    cache: cache().restore(initialState || {}),
    ssrMode: !process.browser,
    link: new HttpLink({ uri: config.api }),
    queryDeduplication: true,
    dataIdFromObject: obj => obj.uid,
  });
}

export default function initApollo(initialState?: Object): ApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(initialState);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create(initialState);

  return apolloClient;
}
