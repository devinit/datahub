// @flow
// run as an npm command to get the map & tabs data cached on the api server
import { getData } from '../utils';
import globalNavTabsData from '../../private/components/organisms/NavBarTabs/data';
import ugNavTabsData from '../../private/components/organisms/NavBarTabs/ug-data';
import MapsQuery from '../../private/components/organisms/Map/Maps.graphql';
import countriesData from '../../private/components/organisms/CountrySearchInput/data';
import TabsQuery from '../../private/components/organisms/CountryProfileTabs/query.graphql';

export const getMapsData = (navData: NavBarItem[]): void => {
  navData.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator: NavIndicator) => {
      const variables = { id: indicator.id };
      setTimeout(() => {
        getData(MapsQuery, variables)
          .then(() => console.log(`precached map data for ${indicator.id || 'nothing'}`))
          .catch(() => console.error(`error precaching ${indicator.id || 'nothing'}`));
      }, 5000);
    });
  });
};

export const getCountryProfileTabsData = (): void => {
  countriesData.countries.forEach((obj: Country) => {
    setTimeout(() => {
      const variables = { id: obj.slug };
      getData(TabsQuery, variables)
        .then(() => console.log(`precached countries data for ${obj.slug || 'nothing'}`))
        .catch(() => console.error(`error precaching ${obj.slug}`));
    }, 5000);
  });
};

const preCache = () => {
  [globalNavTabsData.globalPictureThemes,
    ugNavTabsData.spotlightThemes]
    .forEach((data) => getMapsData(data));
  // getCountryProfileTabsData();
};

if (process.env.NODE_ENV !== 'test') {
  preCache();
}

