// @flow
import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import { getData } from '../utils';
import COUNTRIES_QUERY from './queries/Countries.graphql';
import DISTRICT_QUERY from './queries/Districts.graphql';
import PAGES_DATA_QUERY from './queries/PageData.graphql';
import GLOBAL_PICTURE_THEMES_QUERY from './queries/GlobalPictureThemes.graphql';
import SPOTLIGHT_THEMES_QUERY from './queries/SpotlightThemes.graphql';
import INTL_RESOURCES_TOOLTIP_QUERY from './queries/InternationalResourcesToolTip.graphql';
import INFLOWS_OUTFLOWS_QUERY from './queries/InflowsOutflowsList.graphql';
import BUBBLE_INDICATORS_QUERY from './queries/BubbleChartOptions.graphql';
import UNBUNDLING_QUERY from './queries/UnbundlingAidCache.graphql';
import METHODOLOGY_QUERY from './queries/Methodology.graphql';

const RECIPIENT = 'recipient';
const DONOR = 'donor';
const baseOrganismsPath = 'private/components/organisms';

type CallBack<T> = {
  (data: T): string,
};

type GetAndWriteDataOpts<T> = {
  filePath: string,
  query: string,
  variables?: Object,
  cb?: CallBack<T>,
};


const jsonToJs = (json: string): string =>
  `/* eslint-disable */
  // this file is auto generated
  \n
  module.exports = ${json};
  \n
  `;

const writeToFile = (filePath, content: string): Promise<void> =>
  fs.writeFile(filePath, prettier.format(content, { singleQuote: true }));

async function getAndWriteData<T>(opts: GetAndWriteDataOpts<T>): Promise<void> {
  try {
    const { query, variables, filePath, cb } = opts;
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
    await getAndWriteData({ query: COUNTRIES_QUERY, filePath });
  } catch (error) {
    console.error(error);
  }
};

export const getDistricts = async () => {
  try {
    ['uganda', 'kenya'].forEach(async (country) => {
      const filePath = path.join(baseOrganismsPath, `CountrySearchInput/${country}-data.js`);
      const variables = { country };
      await getAndWriteData({ query: DISTRICT_QUERY, filePath, variables});
    });
  } catch (error) {
    console.error(error);
  }
};
export const getInternationalResourcesToolTip = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'CountryProfileLowerTabs/data.js');
    const variables = { id: 'uganda' }; // any country will do
    await getAndWriteData({ query: INTL_RESOURCES_TOOLTIP_QUERY, filePath, variables });
  } catch (error) {
    console.error(error);
  }
};
export const getGlobalPictureThemes = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'NavBarTabs/data.js');
    await getAndWriteData({ query: GLOBAL_PICTURE_THEMES_QUERY, filePath });
  } catch (error) {
    console.error(error);
  }
};
export const getSpotlightThemes = async () => {
  // currently only getting spotlight uganda theme data
  try {
    ['uganda', 'kenya'].forEach(async (country) => {
      const filePath = path.join(baseOrganismsPath, `NavBarTabs/${country}.js`);
      const variables = { country };
      await getAndWriteData({ query: SPOTLIGHT_THEMES_QUERY, filePath, variables });
    });
  } catch (error) {
    console.error(error);
  }
};
export const getPagesData = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'PagesData/data.js');
    await getAndWriteData({ query: PAGES_DATA_QUERY, filePath});
  } catch (error) {
    console.error(error);
  }
};

export const getInflowsAndOutflows = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'InternationalResourcesChart/data.js');
    const variables = { donor: DONOR, recipient: RECIPIENT };
    await getAndWriteData({query: INFLOWS_OUTFLOWS_QUERY, filePath, variables});
  } catch (error) {
    console.log(error);
  }
};

export const getUnbundlingData = async (aidType: string, year: number) => {
  try {
    const filePath = path.join(baseOrganismsPath, `UnbundlingAid/data-${aidType}.js`);
    const variables = {
      aidType,
      args: {
        aidType,
        year // TODO: shouldnt be hardcoded
      }
    };
    await getAndWriteData({query: UNBUNDLING_QUERY, filePath, variables});
  } catch (error) {
    console.log(error);
  }
};

export const getBubbleOptions = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'DPDP/data.js');
    await getAndWriteData({query: BUBBLE_INDICATORS_QUERY, filePath});
  } catch (error) {
    console.log(error);
  }
};

export const getMethodologyData = async () => {
  ['country-profile', 'global-picture', 'spotlight-uganda', 'spotlight-kenya']
    .forEach(async (moduleName) => {
      try {
        const filePath = path.join(baseOrganismsPath, `Methodology/${moduleName}.js`);
        const variables = {moduleName};
        await getAndWriteData({query: METHODOLOGY_QUERY, filePath, variables});
      } catch (error) {
        console.error(error);
      }
    });
};

if (process.env.NODE_ENV !== 'test') {
  getCountries();
  getDistricts();
  getGlobalPictureThemes();
  getInternationalResourcesToolTip();
  getInflowsAndOutflows();
  getBubbleOptions();
  getMethodologyData();
  getUnbundlingData('oda', 2015);
  getUnbundlingData('oof', 2013);
  getSpotlightThemes();
  getPagesData();
}
