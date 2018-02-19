import fetch from 'isomorphic-fetch';
import * as localforage from 'localforage';
import countriesData from '../__generated__/data';
import keData from '../__generated__/kenya';
import ugData from '../__generated__/uganda';
import {RECIPIENT} from './constants';
import { createApolloFetch,  FetchResult } from 'apollo-fetch';
import {IProcess, Country, District} from '../types';

declare var process: IProcess;

const apolloFetch = createApolloFetch({ uri: process.env.config.api });

export const getCountry = (slug: string): Country => {
  const country = countriesData.countries.find(obj => obj.slug === slug);
  if (!country) return {name: slug, countryType: RECIPIENT, slug, id: 'N/A', has_domestic_data: '', hasPDF: false};
  return country;
};

export const getCountryName = (slug: string): string =>
  getCountry(slug).name || 'slug';

export const getDistrict = (slug: string, country: string): District => {
  const districts = country === 'uganda' ? ugData.districts : keData.districts;
  const district = districts.find(obj => obj.name.toLowerCase() === slug);
  if (district) return {...district, slug};
  return {name: slug, slug, id: ''};
};

export type CallBack<T> = (data: T) => any;

export interface Email {
  message: string;
  token: string;
  emails: string[];
  subject: string;
}

export const sendEmail = (payload: Email) => {
  return fetch('http://data.devinit.org:9999/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};
// will email errors to allan when they occur
// TODO: improve this by adding more info on the errors. i.e if country profile add country etc
export const errorHandler = async (error: string | Error, info?: string) => {
  console.error(error);
  if (process.env.NODE_ENV === 'disable') { // temporarily disable // should be production to renable
    sendEmail({
      message: `info: ${info || ''} error: ${error.toString()} `,
      token: 'e2DQks99XapU6w2s1',
      emails: ['epicallan.al@gmail.com'],
      subject: 'Data hub error report',
    });
  }
};

export async function shouldPurgeCache(version: string): Promise<boolean> {
  const storedVersion = await localforage.getItem('version');
  return !storedVersion || storedVersion !== version;
}

export async function getLocalStorageInstance(version: string): Promise<any> {
  if (process.browser) return Promise.resolve(null);
  try {
    const shouldPurge = await shouldPurgeCache(version);
    if (!shouldPurge) return localforage;
    await localforage.clear();
    await localforage.setItem('version', version);
    return localforage;
  } catch (error) {
    errorHandler(error, 'localforage: ');
    await localforage.clear(); // cache is possibly full so lets clear it
    return localforage;
  }
}

export interface IgetData {
  query: string;
  variables: object;
}

export async function getData<T>(opts: IgetData): Promise<T> {
  try {
    const {query, variables} = opts;
    const key = `${JSON.stringify(query)}${JSON.stringify(variables)}`;
    let storage: any = null;
    if (process.browser) {
      storage = await getLocalStorageInstance(process.version);  // @ts-ignore
      const cached = storage ? await storage.getItem(key) : null;
      if (cached) return JSON.parse(cached);
    }
    const response: FetchResult = variables
      ? await apolloFetch({ query, variables })
      : await apolloFetch({ query });
    if (response.errors) throw response.errors;
    if (storage) {
      try {
        await storage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        errorHandler(error, 'getData function: ');
      }
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cacheMapData = async (workerPath: string): Promise<void> => {
  if (process.browser && (window as any).Worker) {
    try {
      const storage = await getLocalStorageInstance(process.env.version);
      const storedVersion = await storage.getItem(`${process.env.version}-${workerPath}`);
      if (!storedVersion || storedVersion !== `${process.env.version}-${workerPath}`) {
        await storage.setItem(`${process.env.version}-${workerPath}`, `${process.env.version}-${workerPath}`);
        const worker = new Worker(workerPath); // caches global picture map data
        worker.onmessage = (event) => console.log(event);
      }
    } catch (error) {
      errorHandler(error, 'cache mapdata: ');
    }
  }
};

export interface CurrencyOption {
  text: string;
  value: string;
}

export const createCurrencyOptions =
  (currencyCode: string, currencyUSD: string): CurrencyOption[] =>
    [
      { text: currencyUSD, value: 'US$' },
      { text: `Current ${currencyCode}`, value: currencyCode },
    ];

export const capitalize = (slug: string): string => `${slug[0].toUpperCase()}${slug.substr(1)}`;

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

export const getShortURL = async (longUrl: string): Promise<string> => {
  // TODO: add access token to sever env virables
  const apiToken = '43c76f9ad7b4a259615aba8f682b55493477e467';
  const apiUrl = `https://api-ssl.bitly.com/v3/shorten?access_token=${apiToken}`;
  const response = await fetch(`${apiUrl}&longUrl=${longUrl}`);
  const json = await response.json();
  return json.data.url;
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
  return {routePath, routeAsPath};
};

export const getMaxAndMin = (data: Array<{year: number}>): number[] => {
  const years = data.map(obj => Number(obj.year));
  const max: number = Math.max.apply(null, years);
  const min: number = Math.min.apply(null, years);
  return [max, min];
};

export function addMinAndMaxYear(config: {timeAxis} & any, data: any[]): object {
  const [axisMaximum, axisMinimum] = getMaxAndMin(data);
  const timeAxis = {...config.timeAxis, axisMinimum, axisMaximum};
  return {...config, timeAxis};
}
// type GovernmentFinance = $PropertyType<TabDataQuery, 'governmentFinance'>

export const shouldShowTabData = (data: object): boolean => {
  if (!data) return false;
  return !Object.keys(data)
    .every(key => {
      const value = data[key].value || data[key].data;
      if (!value) return true;
      return value === 'No data' || !value.length;
    });
};

const removeTrailingZero = (value: string): string => {
  const val = Number(value);
  return Math.round(val) === val ? val.toString() : value;
};

// (10 ** length) == Math.pow(10, length);
export const roundNum = (num, length): string =>
  (Math.round(num * (10 ** length)) / (10 ** length)).toFixed(length);

export const approximate =
  (value: number | string | undefined | null,
   precision: number = 1,
   shouldrRemoveTrailingZero: boolean = false): string => {
  if (value === undefined || value === null) return 'No data';
  const val = Number(value);
  const absValue = Math.abs(val);
  if (absValue < 1e3) {
      const fixed = roundNum(val, precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}` : fixed;
  } else if (absValue >= 1e3 && absValue < 1e6) {
      const newValue = val / 1e3;
      const fixed = roundNum(newValue, precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}k` : `${fixed}k`;
  } else if (absValue >= 1e6 && absValue < 1e9) {
      const newValue = val / 1e6;
      const fixed = roundNum(newValue, precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}m` : `${fixed}m`;
  } else {
      const newValue = val / 1e9;
      const fixed = roundNum(newValue, precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}bn` : `${fixed}bn`;
  }
};
