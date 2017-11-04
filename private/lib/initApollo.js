// @flow
import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-fetch';
import {HttpLink} from 'apollo-link-http';
import { config } from 'package.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './graphql/fragmentTypes.json';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

export function create(initialState?: Object): ApolloClient {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
    ssrMode: !process.browser,
    link: new HttpLink({ uri: config.api }),
    queryDeduplication: true,
    dataIdFromObject: object => object.uid,
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
