import React from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import {store} from './redux';
import initApollo from '../initApollo';

const client = initApollo(true);
// APollo provide comes with redux provider
export const withApolloAndReduxProvider = () => {
  return storyFn => {
    return (
      <ApolloProvider client={client} store={store}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
