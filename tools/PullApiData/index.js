// @flow
import {config} from 'package.json';
import { createApolloFetch } from 'apollo-fetch';
import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import COUNTRIES_QUERY from './queries/Countries.graphql';
import GLOBAL_PICTURE_THEMES_QUERY from './queries/GlobalPictureThemes.graphql';
import SPOTLIGHT_THEMES_QUERY from './queries/SpotlightThemes.graphql';

const baseOrganismsPath = 'private/components/organisms';
const uri = config.api;

const apolloFetch = createApolloFetch({ uri });

type ApolloResponse <T> = {
  errors: string,
  data: T,
  extensions: string,
}
type CallBack<T> = {
  (data: T): string
}

type GetAndWriteDataOpts <T> = {
  filePath: string,
  query: string,
  variables?: Object,
  cb?: CallBack<T>
}

export async function getData <T>(query: string, variables?: Object): Promise<T> {
  try {
    const response: ApolloResponse<T> =
      variables ? await apolloFetch({query, variables}) : await apolloFetch({query});
    if (response.error) throw response.errors;
    return response.data;
  } catch (error) {
    throw error;
  }
}

const jsonToJs = (json: string): string =>
  `/* eslint-disable */
  // this file is auto generated
  \n
  module.exports = ${json};
  \n
  `;

const writeToFile = (filePath, content: string): Promise<void> =>
  fs.writeFile(filePath, prettier.format(content, {singleQuote: true}));

async function getAndWriteData <T>(opts: GetAndWriteDataOpts<T>): Promise<void> {
  try {
    const {query, variables, filePath, cb} = opts;
    const response: T = await getData(query, variables);
    if (cb) return await writeToFile(filePath, cb(response));
    const content: string = jsonToJs(JSON.stringify(response));
    return await writeToFile(filePath, content);
  } catch (error) {
    throw error;
  }
}
export const getCountries = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'CountrySearchInput/data.js');
    await getAndWriteData({query: COUNTRIES_QUERY, filePath});
  } catch (error) {
    console.error(error);
  }
};

export const getGlobalPictureThemes = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'GlobalPictureNavTabs/data.js');
    await getAndWriteData({query: GLOBAL_PICTURE_THEMES_QUERY, filePath});
  } catch (error) {
    console.error(error);
  }
};
export const getSpotlightThemes = async () => {
  // currently only getting spotlight uganda theme data
  try {
    const filePath = path.join(baseOrganismsPath, 'SpotlightNavTabs/ug-data.js');
    const variables = {country: 'uganda'};
    await getAndWriteData({query: SPOTLIGHT_THEMES_QUERY, filePath, variables});
  } catch (error) {
    console.error(error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  getCountries();
  getGlobalPictureThemes();
  getSpotlightThemes();
}
