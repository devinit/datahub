// @flow
import { createApolloFetch } from 'apollo-fetch';
import {config} from '../../../package.json';

const uri = config.api;

const apolloFetch = createApolloFetch({ uri });

const getData = (query: string, variables?: Object) => {
  return variables ? apolloFetch({ query, variables}) : apolloFetch({ query});
};
