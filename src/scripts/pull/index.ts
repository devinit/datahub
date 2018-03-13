import {getAndWriteData} from '@devinit/prelude';
import * as path from 'path';
import COUNTRIES_QUERY from './queries/Countries';
// const COUNTRIES_QUERY = require('./queries/Countries');
import DISTRICT_QUERY from './queries/Districts';
import {PAGES_DATA_QUERY} from './queries/PageData';
import {GLOBAL_PICTURE_THEMES_QUERY} from './queries/GlobalPictureThemes';
import {SPOTLIGHT_THEMES_QUERY} from './queries/SpotlightThemes';
import {INTL_RESOURCES_TOOLTIP_QUERY} from './queries/InternationalResourcesToolTip';
import {INFLOWS_OUTFLOWS_QUERY} from './queries/InflowsOutflowsList';
import {BUBBLE_INDICATORS_QUERY} from './queries/BubbleChartOptions';
import {UNBUNDLING_QUERY} from './queries/UnbundlingAidCache';
import {METHODOLOGY_QUERY} from './queries/Methodology';

const RECIPIENT = 'recipient';
const DONOR = 'donor';
const baseOrganismsPath = 'src/components/organisms';
const baseMoleculesPath = 'src/components/molecules';

const getWrite = getAndWriteData(process.env.npm_package_config_API);

export const getCountries = async () => {
  try {
    const filePath = path.join(baseMoleculesPath, 'SearchInput/global.ts');
    await getWrite({ query: COUNTRIES_QUERY, filePath });
  } catch (error) {
    console.error(error);
  }
};

export const getDistricts = async () => {
  try {
    ['uganda', 'kenya'].forEach(async (country) => {
      const filePath = path.join(baseMoleculesPath, `SearchInput/${country}.ts`);
      const variables = { country };
      await getWrite({ query: DISTRICT_QUERY, filePath, variables});
    });
  } catch (error) {
    console.error(error);
  }
};
export const getInternationalResourcesToolTip = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'CountryProfileLowerTabs/data.ts');
    const variables = { id: 'uganda' }; // any country will do
    await getWrite({ query: INTL_RESOURCES_TOOLTIP_QUERY, filePath, variables });
  } catch (error) {
    console.error(error);
  }
};
export const getGlobalPictureThemes = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'NavBarTabs/data.ts');
    await getWrite({ query: GLOBAL_PICTURE_THEMES_QUERY, filePath });
  } catch (error) {
    console.error(error);
  }
};
export const getSpotlightThemes = async () => {
  // currently only getting spotlight uganda theme data
  try {
    ['uganda', 'kenya'].forEach(async (country) => {
      const filePath = path.join(baseOrganismsPath, `NavBarTabs/${country}.ts`);
      const variables = { country };
      await getWrite({ query: SPOTLIGHT_THEMES_QUERY, filePath, variables });
    });
  } catch (error) {
    console.error(error);
  }
};
export const getPagesData = async () => {
  try {
    const filePath = path.join('src/components', 'pageData/data.ts');
    await getWrite({ query: PAGES_DATA_QUERY, filePath});
  } catch (error) {
    console.error(error);
  }
};

export const getInflowsAndOutflows = async () => {
  try {
    const filePath = path.join(baseOrganismsPath, 'InternationalResourcesChart/data.ts');
    const variables = { donor: DONOR, recipient: RECIPIENT };
    await getWrite({query: INFLOWS_OUTFLOWS_QUERY, filePath, variables});
  } catch (error) {
    console.log(error);
  }
};

export const getUnbundlingData = async (aidType: string) => {
  try {
    const filePath = path.join(baseOrganismsPath, `UnbundlingAid/data-${aidType}.ts`);
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
    const filePath = path.join(baseOrganismsPath, 'DPDP/data.ts');
    await getWrite({query: BUBBLE_INDICATORS_QUERY, filePath});
  } catch (error) {
    console.log(error);
  }
};

export const getMethodologyData = async () => {
  ['country-profile', 'global-picture', 'spotlight-uganda', 'spotlight-kenya']
    .forEach(async (moduleName) => {
      try {
        const filePath = path.join('src/components', `MethodologyData/${moduleName}.ts`);
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
