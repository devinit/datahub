import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import {store} from './redux';
import {client} from './apollo';

// APollo provide comes with redux provider
const withApolloAndReduxProvider = () => {
  return storyFn => {
    return (
      <ApolloProvider client={client} store={store}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
export default withApolloAndReduxProvider;
