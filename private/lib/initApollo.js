// @flow
import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';
import {config} from 'package.json';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(): ApolloClient {
  return new ApolloClient({
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !process.browser,
    networkInterface: createBatchingNetworkInterface({
      uri: config.api,
      batchInterval: 10,
    }),
    queryDeduplication: true,
    dataIdFromObject: object => object.uid,
  });
}

export default function initApollo(): ApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create();

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create();

  return apolloClient;
}
