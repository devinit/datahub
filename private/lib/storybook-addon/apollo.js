/**
 * simple apollo Provider for querying a live graphql API
 * TODO: add ability to mock data from schema
 */
import React from 'react';
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo';
import { config } from 'package.json';

function create() {
  return new ApolloClient({
    networkInterface: createBatchingNetworkInterface({
      uri: config.api,
      batchInterval: 10,
    }),
    queryDeduplication: true,
    dataIdFromObject: object => object.uid,
  });
}

export const client = create();

const withApolloProvider = () => {
  return storyFn => {
    return (
      <ApolloProvider client={client}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
export default withApolloProvider;
