import React from 'react';
/**
 * simple apollo Provider for querying a live graphql API
 * TODO: add ability to mock data from schema
 */
import { ApolloClient, ApolloProvider } from 'react-apollo';
import initApollo from '../initApollo';

const client = initApollo(true);

export const withApolloProvider = () => {
  return storyFn => {
    return (
      <ApolloProvider client={client}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
