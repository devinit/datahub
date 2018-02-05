import { getData } from '../utils';

// running this module will trigger the server to cache the requested data in memory
// hence precaching on the server

export const getMapsData = <T extends {indicators: U[]}, U extends {id: string}>
(navData: T[], mapsQuery: string): void => {
  navData.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator: U) => {
      const variables = { id: indicator.id };
      setTimeout(() => {
        getData({query: mapsQuery, variables})
          .then(() => console.log(`precached map data for ${indicator.id || 'nothing'}`))
          .catch((error) => console.error(`error precaching ${indicator.id || 'nothing'}`, error));
      }, 5000);
    });
  });
};

type IMapTheme = Array<{indicators: Array<{id: string}>}>;

interface IPrecacheOpts {
  mapThemesData: IMapTheme[];
  mapsQuery: string;
}

export const preCacheMapsData = (opts: IPrecacheOpts) =>
  opts.mapThemesData
      .forEach((data: IMapTheme) => getMapsData(data, opts.mapsQuery));
