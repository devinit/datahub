// @flow
import { config } from 'package.json';
import { createApolloFetch } from 'apollo-fetch';

const uri = config.api;

const apolloFetch = createApolloFetch({ uri });

export type ApolloResponse<T> = {
  errors: string,
  data: T,
  extensions: string,
};

export type CallBack<T> = {
  (data: T): string,
};

export async function getData<T>(query: string, variables?: Object): Promise<T> {
  try {
    const response: ApolloResponse<T> = variables
      ? await apolloFetch({ query, variables })
      : await apolloFetch({ query });
    if (response.error) throw response.errors;
    return response.data;
  } catch (error) {
    throw error;
  }
}
