import {getAndWriteData, IGetAndWriteDataOpts} from '@devinit/graphql-next/lib/query';
import * as path from 'path';
import * as fs from 'fs-extra';
const COUNTRIES_QUERY = require('./queries/Countries.graphql');
const DISTRICT_QUERY = require('./queries/Districts.graphql');
const PAGES_DATA_QUERY = require('./queries/pageData.graphql');
const GLOBAL_PICTURE_THEMES_QUERY = require('./queries/GlobalPictureThemes.graphql');
const SPOTLIGHT_THEMES_QUERY = require('./queries/SpotlightThemes.graphql');
const INTL_RESOURCES_TOOLTIP_QUERY = require('./queries/InternationalResourcesToolTip.graphql');
const INFLOWS_OUTFLOWS_QUERY = require('./queries/InflowsOutflowsList.graphql');
const BUBBLE_INDICATORS_QUERY = require('./queries/BubbleChartOptions.graphql');
const UNBUNDLING_QUERY = require('./queries/UnbundlingAidCache.graphql');
const METHODOLOGY_QUERY = require('./queries/Methodology.graphql');

const RECIPIENT = 'recipient';
const DONOR = 'donor';
const baseOrganismsPath = 'src/components/organisms';

const getWrite = (obj: IGetAndWriteDataOpts<any>) =>
  getAndWriteData('http://localhost:8080/graphql')({...obj, query: getGql(obj.query)});

const getGql = (fileName: string): string => fs.readFileSync(`src/pull/${fileName}.gql`, 'utf8');

export const getCountries = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'CountrySearchInput/data.js');
    await getWrite({ query: COUNTRIES_QUERY, filePath });
  } catch (error) {
    console.error(error);
  }
};

export const getDistricts = async () => {
  try {
    ['uganda', 'kenya'].forEach(async (country) => {
      const filePath = path.join(baseOrganismsPath, `CountrySearchInput/${country}-data.js`);
      const variables = { country };
      await getWrite({ query: DISTRICT_QUERY, filePath, variables});
    });
  } catch (error) {
    console.error(error);
  }
};
export const getInternationalResourcesToolTip = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'CountryProfileLowerTabs/data.js');
    const variables = { id: 'uganda' }; // any country will do
    await getWrite({ query: INTL_RESOURCES_TOOLTIP_QUERY, filePath, variables });
  } catch (error) {
    console.error(error);
  }
};
export const getGlobalPictureThemes = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'NavBarTabs/data.js');
    await getWrite({ query: GLOBAL_PICTURE_THEMES_QUERY, filePath });
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
      await getWrite({ query: SPOTLIGHT_THEMES_QUERY, filePath, variables });
    });
  } catch (error) {
    console.error(error);
  }
};
export const getPagesData = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'PagesData/data.js');
    await getWrite({ query: PAGES_DATA_QUERY, filePath});
  } catch (error) {
    console.error(error);
  }
};

export const getInflowsAndOutflows = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'InternationalResourcesChart/data.js');
    const variables = { donor: DONOR, recipient: RECIPIENT };
    await getWrite({query: INFLOWS_OUTFLOWS_QUERY, filePath, variables});
  } catch (error) {
    console.log(error);
  }
};

export const getUnbundlingData = async (aidType: string) => {
  try {
    const filePath = path.join(baseOrganismsPath, `UnbundlingAid/data-${aidType}.js`);
    const variables = {
      aidType,
      args: {
        aidType
      }
    };
    await getWrite({query: UNBUNDLING_QUERY, filePath, variables});
  } catch (error) {
    console.log(error);
  }
};

export const getBubbleOptions = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'DPDP/data.js');
    await getWrite({query: BUBBLE_INDICATORS_QUERY, filePath});
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
        await getWrite({query: METHODOLOGY_QUERY, filePath, variables});
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
  getUnbundlingData('oda');
  getUnbundlingData('oof');
  getSpotlightThemes();
  getPagesData();
}
