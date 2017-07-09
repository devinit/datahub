import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(isForStorybook) {
  return new ApolloClient({
    ssrMode: isForStorybook ? false : !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: createBatchingNetworkInterface({
      uri: 'http://localhost:3000/graphql', // Server URL (must be absolute) // TODO: chage url
      batchInterval: 10,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: 'same-origin',
      },
    }),
    queryDeduplication: true,
    dataIdFromObject: object => object.id,
  });
}

export default function initApollo(isForStorybook = false) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(isForStorybook);

  if (isForStorybook) return create(isForStorybook);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create();

  return apolloClient;
}
