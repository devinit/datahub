// @flow
import {config} from 'package.json';
import { createApolloFetch } from 'apollo-fetch';
import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import COUNTRIES_QUERY from '../../private/graphql/Countries.graphql';

const baseOrganismsPath = 'private/components/organisms';
const uri = config.api;

const apolloFetch = createApolloFetch({ uri });

type ApolloResponse <T> = {
  error: string,
  data: T,
  extensions: string,
}

async function getData <T>(query: string, variables?: Object): Promise<T> {
  try {
    const response: ApolloResponse<T> =
      variables ? await apolloFetch({query, variables}) : await apolloFetch({query});
    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    throw error;
  }
}


const jsonToJs = (json: string): string =>
  `/* eslint-disable */
  // this file is auto generated
  \n
  export default ${json};
  \n
  `;

const writeToFile = (filePath, content: string): Promise<void> =>
  fs.writeFile(filePath, prettier.format(content, {singleQuote: true}));


export const getCountries = async () => {
  try {
    const response: CountriesQuery = await getData(COUNTRIES_QUERY);
    if (response.error) throw response.error;
    const filePath = path.join(baseOrganismsPath, 'CountrySearch/data.js');
    // console.log(response);
    const content: string = jsonToJs(JSON.stringify(response));
    await writeToFile(filePath, content);
  } catch (error) {
    console.error(error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  getCountries();
}
