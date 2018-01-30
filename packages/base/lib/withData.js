// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import initApollo from './initApollo';
import { initRedux} from './initRedux';

type Props = {
  serverState: Object
}
// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}
// $FlowFixMe
export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;
    static propTypes = {
      serverState: Object
    };

    static async getInitialProps(ctx) {
      let serverState = {};

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        try {
          composedInitialProps = await ComposedComponent.getInitialProps(ctx);
        } catch (error) {
          console.error('withdata: ', error);
        }
      }
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux();
        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            // No need to use the Redux Provider
            // because Apollo sets up the store for us
            <Provider store={redux}>
              <ApolloProvider client={apollo} >
                <ComposedComponent url={url} {...composedInitialProps} />
              </ApolloProvider>
            </Provider>,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        // $FlowFixMe
        Head.rewind();

        // Extract query data from the store
        // const state = redux.getState();
        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: {
            // Only include the Apollo data state
            data: apollo.cache.extract()
          },
        };
      }
      return {
        serverState,
        ...composedInitialProps,
      };
    }
    constructor(props: Props) {
      super(props);
      const apolloData = this.props.serverState && this.props.serverState.apollo
        && this.props.serverState.apollo.data;
      this.apollo = initApollo(apolloData);
      // the inital state we might have passed is now entirely handled by apollo
      this.redux = initRedux();
    }
    apollo: any;
    redux: any;
    render() {
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        <Provider store={this.redux}>
          <ApolloProvider client={this.apollo}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
        </Provider>
      );
    }
  };
};
