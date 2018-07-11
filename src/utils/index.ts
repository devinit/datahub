import { RECIPIENT } from './constants';
import { menueData } from '../components/templates/Generic/data';
import { MenuItem } from '../components/molecules/Menu/types';
import countriesData from '../components/molecules/SearchInput/global';
import ugData from '../components/molecules/SearchInput/uganda';
import keData from '../components/molecules/SearchInput/kenya';
import { Country, District, IProcess } from '../components/types';
import * as localforage from 'localforage';
import { FetchResult, createApolloFetch } from 'apollo-fetch';
import { getMaxAndMin } from '@devinit/prelude/lib/numbers';
import { capitalize } from '@devinit/prelude/lib/strings';
import { sendEmail } from '@devinit/prelude/lib/misc';

declare var process: IProcess;
declare const APP_VERSION: string;
declare const API: string;

export interface PageMetaArgs {
  query?: string;
  pathname: string;
}

export interface PageMeta {
  title: string;
  image?: string;
  width?: string;
  height?: string;
}

export const createLinkMeta = (args: PageMetaArgs, obj: MenuItem): PageMeta => {
  let title = obj.name;
  if (obj.link === '/uganda') {
    title = capitalize(args.query || '');
  }
  if (obj.link === '/') { title = 'Development Data Hub'; }
  if (obj.link === '/country') {
    title = getCountryName(args.query || '');
  }

  return { title };
};

export const getPageMeta = (args: PageMetaArgs): PageMeta => {
  // TODO: add proper types
  const item = menueData.menu
    .reduce((acc: MenuItem[], obj: MenuItem) => {
      if (obj.children) {
        return [ ...acc, ...obj.children ];
      }

      return [ ...acc, obj ];
    }, [])
    .concat([ { link: '/country', name: '' }, { link: '/uganda', name: '' } ])
    .find(obj => obj.link === args.pathname);

  if (!item) {
    return { title: 'Development Data Hub' };
  }

  return createLinkMeta(args, item);
};

export async function shouldPurgeCache(): Promise<boolean> {
  const storedVersion = await localforage.getItem('version');

  return !storedVersion || storedVersion !== APP_VERSION;
}

export async function getLocalStorageInstance(): Promise<any> {
  if (!process.browser) {
    return Promise.resolve(null);
  }
  try {
    const shouldPurge = await shouldPurgeCache();
    if (!shouldPurge) {
      return localforage;
    }
    await localforage.clear();
    await localforage.setItem('version', APP_VERSION);

    return localforage;
  } catch (error) {
    console.error(error, 'localforage: ');
    await localforage.clear(); // cache is possibly full so lets clear it

    return localforage;
  }
}

export interface GetDataOptions {
  query: string;
  variables: any;
}

// TODO: EMP - use actual promises to return from cache first, but also to pull from the source & update if any exists.
export async function getData<T>(options: GetDataOptions): Promise<T> {
  try {
    const { query, variables } = options;
    const key = `${JSON.stringify(query)}${JSON.stringify(variables)}`;
    let storage: LocalForage | null = null;
    if (!API || !APP_VERSION) {
      throw new Error('missing env config, check package.json for env virables & next.config');
    }
    const apolloFetch = createApolloFetch({ uri: API });
    if (process.browser) {
      storage = await getLocalStorageInstance(); // @ts-ignore
      const cached = storage ? await storage.getItem<string>(key) : null;
      if (cached) { return JSON.parse(cached); }
    }
    const response: FetchResult = await apolloFetch({ query, variables: variables || undefined });
    if (response.errors) {
      throw response.errors;
    }
    if (storage) {
      try {
        await storage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        console.error(error, 'getData function: ');
      }
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cacheMapData = async (workerPath: string): Promise<void> => {
  if (process.env.NODE_ENV !== 'test' && process.browser && (window as any).Worker) {
    try {
      const storage = await getLocalStorageInstance();
      const storedVersion = await storage.getItem(`${APP_VERSION}-${workerPath}`);
      if (!storedVersion || storedVersion !== `${APP_VERSION}-${workerPath}`) {
        await storage.setItem(`${APP_VERSION}-${workerPath}`, `${APP_VERSION}-${workerPath}`);
        const worker = new Worker(workerPath); // caches global picture map data
        worker.onmessage = event => console.log(event);
      }
    } catch (error) {
      if (error) {
        console.error(error, 'cache mapdata: ');
      }
    }
  }
};

// next.js compatible router interface
export interface Router {
  push: (url: string, as?: string) => any;
}

export const router: Router = {
  push: (_url: string, as?: string) => {
    if (typeof window !== 'undefined') {
      return (window as any).location.assign(as);
    }

    return console.log('cant change url in server environment');
  }
};

export const getCountry = (slug: string): Country => {
  const country = countriesData.countries.find(obj => obj.slug === slug);
  if (!country) {
    return {
      name: slug,
      countryType: RECIPIENT,
      slug,
      id: 'N/A',
      has_domestic_data: '',
      hasPDF: false
    };
  }

  return country;
};

export const getCountryName = (slug: string): string => getCountry(slug).name || 'slug';

export const getDistrict = (slug: string, country: string): District => {
  const districts = country === 'uganda' ? ugData.districts : keData.districts;
  const district = districts.find(obj => obj.name.toLowerCase() === slug);
  if (district) {
    return { ...district, slug };
  }

  return { name: slug, slug, id: '' };
};

export type CallBack<T> = (data: T) => any;

export interface Email {
  message: string;
  token: string;
  emails: string[];
  subject: string;
}

// will email errors to allan when they occur
// TODO: improve this by adding more info on the errors. i.e if country profile add country etc
export const errorHandler = async (error: string | Error, info?: string) => {
  console.error(error);
  sendEmail({
    message: `info: ${info || ''} error: ${error.toString()} `,
    token: 'e2DQks99XapU6w2s1',
    emails: [ 'epicallan.al@gmail.com' ],
    subject: 'Data hub error report'
  });
  // if (process.env.NODE_ENV === 'production') { // temporarily disable // should be production to renable
  // }
};

export interface CurrencyOption {
  text: string;
  value: string;
}

export const createCurrencyOptions = (
  currencyCode: string,
  currencyUSD: string
): CurrencyOption[] => [
  { text: currencyUSD, value: 'US$' },
  { text: `Current ${currencyCode}`, value: currencyCode }
];

export const printDiv = (divId: string) => {
  const divElem = document.getElementById(divId);
  const printContents = divElem && divElem.innerHTML ? divElem.innerHTML : 'Inavlid div id';
  const originalContents = document.body && document.body.innerHTML ? document.body.innerHTML : '';
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = printContents;
  }
  window.print();
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = originalContents;
  }
};

// country is global or uganda or kenya etc
export interface Route {
  routeAsPath: string;
  routePath: string;
}

export const countryOrDistrictLink = (country: string, slug: string): Route => {
  let routePath: string;
  let routeAsPath: string;
  if (country === 'global') {
    routePath = `/country?id=${slug}`;
    routeAsPath = `/country/${slug}`;
  } else {
    routePath = `/${country}?id=${slug}`;
    routeAsPath = `/${country}/${slug}`;
  }

  return { routePath, routeAsPath };
};

export function addMinAndMaxYear(config: { timeAxis: any } & any, data: any[]): object { // TODO: replace "any" type
  const [ axisMaximum, axisMinimum ] = getMaxAndMin(data);
  const timeAxis = { ...config.timeAxis, axisMinimum, axisMaximum };

  return { ...config, timeAxis };
}
// type GovernmentFinance = $PropertyType<TabDataQuery, 'governmentFinance'>

export const shouldShowTabData = (data: { [key: string]: any }): boolean => { // TODO: replace "any" type
  if (!data) {
    return false;
  }

  return !Object.keys(data).every(key => {
    const value = data[key].value || data[key].data;
    if (!value) {
      return true;
    }

    return value === 'No data' || !value.length;
  });
};

export const shouldHaveMapboxCss = (pathname: string): boolean => {
  if (pathname === '/') {
    return true;
  }
  const basePathName = pathname.split('/')[1];
  if (!basePathName) {
    return false;
  }

  return [ '/country', '/kenya', '/uganda', '/spotlight-on-kenya', '/spotlight-on-uganda' ].some(
    path => {
      return RegExp(`\/${basePathName}\S*`).test(path);
    }
  );
};
