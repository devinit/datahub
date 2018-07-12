import 'isomorphic-fetch';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-client-preset';
import { IProcess } from '../components/types';
import { CachePersistor } from 'apollo-cache-persist';
import * as localforage from 'localforage';
const introspectionQueryResultData = require('./fragmentTypes.json');

// (global as any).fetch = (global as any).fetch || fetch;
declare const process: IProcess;

declare const APP_VERSION: string;
declare const API: string;
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

let apolloClient;
export interface InitApollo {
  initialState?: any;
}

const cache = () => new InMemoryCache({
  dataIdFromObject: (obj: {uid?: string}) => obj.uid,
  fragmentMatcher: introspectionQueryResultData && new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
});

const persist = async () => {
  const persistor = new CachePersistor({
    cache: cache(),
    storage: localforage
  });
  // Read the current schema version from AsyncStorage.
  const currentVersion = await localforage.getItem(SCHEMA_VERSION_KEY);

  if (APP_VERSION === currentVersion) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore();
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge();
    await localforage.setItem(SCHEMA_VERSION_KEY, APP_VERSION);
  }
};

export function create({ initialState }: InitApollo): ApolloClient<any> {
  if (process.browser) {
    persist();
  }

  return new ApolloClient({
    connectToDevTools: process.browser, // comes from webpack
    cache: cache().restore(initialState || {}),
    ssrMode: !process.browser,
    link: new HttpLink({ uri: API }) as ApolloLink, // TODO: types are wrong in graphql
    queryDeduplication: true
  });
}

export default function initApollo(args?: InitApollo): ApolloClient<any> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) { return create(args || {}); }
  // Reuse client on the client-side
  if (!apolloClient) { apolloClient = create(args || {}); }

  return apolloClient;
}
