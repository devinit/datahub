import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { store, Istore } from './redux';
import { client } from './apollo';

// APollo provide comes with redux provider
const withApolloAndReduxProvider = (args: Istore) => {
  return storyFn => {
    return (
      <Provider store={store(args)}>
        <ApolloProvider client={client}>
          {storyFn()}
        </ApolloProvider>
      </Provider>
    );
  };
};
export default withApolloAndReduxProvider;
