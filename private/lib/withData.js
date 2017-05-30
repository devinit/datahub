import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { compose } from 'redux';
import initApollo from './initApollo';
import { initRedux } from './initRedux';
import { persistStore, createPersistor, getStoredState } from 'redux-persist';

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      let serverState = {};
      // console.log('ctx', ctx)
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
        console.log('composedInitialProps', composedInitialProps);
      }
      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux(apollo);
        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };

        // Run all graphql queries
        const app =
          // No need to use the Redux Provider
          // because Apollo sets up the store for us
          (
            <ApolloProvider client={apollo} store={redux}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          );
        await getDataFromTree(app);

        // Extract query data from the store
        const state = redux.getState();
        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: {
            // Make sure to only include Apollo's data state
            data: state.apollo.data
          }
        };
      }
      return {
        serverState,
        ...composedInitialProps
      };
    }
    componentWillMount(){
      persistStore(store, {}, () => {
        this.setState({ rehydrated: true })
      })
    }

    constructor(props) {
      super(props);
      this.state = { rehydrated: false };
      this.apollo = initApollo();
      if (process.browser) {
        const persistConfig = { whitelist: ['apollo'] };
        getStoredState(persistConfig, (err, restoredState) => {
          this.redux = initRedux(this.apollo, Object.assign(this.props.serverState, restoredState));
          this.setState({ rehydrated: true });
          console.log('hydated store');
          const persistor = createPersistor(this.redux, persistConfig);
        });
      }
      this.redux = initRedux(this.apollo, this.props.serverState);
    }

    render() {
      // if (!this.state.rehydrated && process.browser) {
      //   return (<div>Loading...</div>);
      // }
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        (
          <ApolloProvider client={this.apollo} store={this.redux}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
        )
      );
    }
  };
};
