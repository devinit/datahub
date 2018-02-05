import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-client-preset';
// import { process } from '../types/index';

(global as any).fetch = (global as any).fetch || fetch;

// declare var process : Process;

let apolloClient;

const cache = (introspectionQueryResultData?: any) => new InMemoryCache({
  dataIdFromObject: (obj: {uid?: string}) => obj.uid,
  fragmentMatcher: introspectionQueryResultData && new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })
});

export function create(args: InitApollo): ApolloClient<any> {
  const {initialState, uri, introspectionQueryResultData} = args;
  return new ApolloClient({
    connectToDevTools: process.browser, // comes from webpack
    cache: cache(introspectionQueryResultData).restore(initialState || {}),
    ssrMode: !process.browser,
    link: new HttpLink({ uri: process.config.api || uri }),
    queryDeduplication: true
  });
}

interface InitApollo {
  initialState?: any;
  uri?: string; // defaults to process.browser
  introspectionQueryResultData?: any;
}

export default function initApollo(args?: InitApollo): ApolloClient<any> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  const opts = {...args || {}, uri: process.config.api || args && args.uri};

  if (!process.browser) return create(opts);

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create(opts);

  return apolloClient;
}
