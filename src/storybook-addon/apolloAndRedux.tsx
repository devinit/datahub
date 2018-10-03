import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { initRedux } from '../redux';
import { client } from './apollo';

const withApolloAndReduxProvider = () => {
  return storyFn => {
    return (
      <Provider store={ initRedux() }>
        <ApolloProvider client={ client }>
          { storyFn() }
        </ApolloProvider>
      </Provider>
    );
  };
};
export default withApolloAndReduxProvider;
