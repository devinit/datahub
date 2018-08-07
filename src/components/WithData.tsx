import Head from 'next/head';
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import initApollo from '../apollo';
import { initRedux } from '../redux';
import { State } from '../redux/reducers';
import { IProcess } from './types';

declare var process: IProcess;

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export interface Props {
    serverState: any;
}
  // Ge
export default ComposedComponent => {
  return class WithData extends React.Component<Props> {
    apollo: any;
    redux: Store<State>;
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;

    constructor(props) {
      super(props);

      this.apollo = initApollo(this.props.serverState.apollo.data);
      this.redux = initRedux();
    }

    render() {
      return (
        <Provider store={ this.redux }>
          <ApolloProvider client={ this.apollo }>
            <ComposedComponent { ...this.props } />
          </ApolloProvider>
        </Provider>
      );
    }

    public static async getInitialProps(ctx) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {}
        }
      };

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux();
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <Provider store={ redux }>
              <ApolloProvider client={ apollo }>
                <ComposedComponent { ...composedInitialProps } />
              </ApolloProvider>
            </Provider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query
              }
            }
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }
      // console.log('initial props: ', composedInitialProps);

      return {
        serverState,
        ...composedInitialProps
      };
    }
  };
};
