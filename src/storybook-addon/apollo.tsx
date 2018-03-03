/**
 * simple apollo Provider for querying a live graphql API
 * TODO: add ability to mock data from schema
 */
import * as React from 'react';
import { ApolloProvider} from 'react-apollo';
import {create} from '../apollo';
import ApolloClient from 'apollo-client';

export const client: ApolloClient<any> = create({});

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
