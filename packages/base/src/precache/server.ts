// @flow
// run as an npm command to get the map & tabs data cached on the api server
import { getData } from '../utils';

export const getMapsData = <T extends {indicators: U[]}, U extends {id: string}>
(navData: T[], mapsQuery: string): void => {
  navData.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator: U) => {
      const variables = { id: indicator.id };
      setTimeout(() => {
        getData(mapsQuery, variables)
          .then(() => console.log(`precached map data for ${indicator.id || 'nothing'}`))
          .catch((error) => console.error(`error precaching ${indicator.id || 'nothing'}`, error));
      }, 5000);
    });
  });
};

type IMapTheme = Array<{indicators: Array<{id: string}>}>;

export const preCacheMapsData = (mapThemesData: IMapTheme[], mapsQuery: string) =>
  mapThemesData.forEach((data: IMapTheme) => getMapsData(data, mapsQuery));
