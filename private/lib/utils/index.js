// @flow
import fetch from 'isomorphic-fetch';
import countriesData from 'components/organisms/CountrySearchInput/data';
import {menueData} from 'components/templates/Generic/data';
import type {MenueItem} from 'components/templates/Generic/data';
import ugDistrictData from 'components/organisms/CountrySearchInput/ug-data';
import { config, version } from 'package.json';
import localforage from 'localforage';
import { createApolloFetch } from 'apollo-fetch';
import {RECIPIENT} from './constants';

const uri = config.api;

const apolloFetch = createApolloFetch({ uri });

export type ApolloResponse<T> = {
  errors: string,
  data: T,
  extensions: string,
}

export type CallBack<T> = {
  (data: T): string,
}
export async function shouldCacheData(): Promise<boolean> {
  const storedVersion = await localforage.getItem('version');
  return !storedVersion || storedVersion !== version;
}

export async function getLocalStorageInstance(): Promise<any> {
  if (!process.browser) return Promise.resolve(null);
  try {
    const shouldCache = await shouldCacheData();
    if (!shouldCache) return localforage;
    await localforage.clear();
    await localforage.setItem('version', version);
    return localforage;
  } catch (error) {
    console.error(error);
    return localforage;
  }
}
export async function getData<T>(query: string, variables: Object): Promise<T> {
  try {
    const key = `${JSON.stringify(query)}${JSON.stringify(variables)}`;
    const storage = await getLocalStorageInstance();
    const cached = storage ? await storage.getItem(key) : null;
    if (cached) return JSON.parse(cached);
    const response: ApolloResponse<T> = variables
      ? await apolloFetch({ query, variables })
      : await apolloFetch({ query });
    if (response.error) throw response.errors;
    if (storage) {
      try {
        await storage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
export type CurrencyOption = {
  text: string,
  value: string
}

export const createCurrencyOptions =
  (currencyCode: string, currencyUSD: string): CurrencyOption[] =>
    [
      { text: currencyUSD, value: 'US$' },
      { text: `Current ${currencyCode}`, value: currencyCode },
    ];

export const getCountry = (slug: string): Country => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (!country) return {name: slug, countryType: RECIPIENT, slug, id: 'N/A', has_domestic_data: ''};
  return country;
};

export const getCountryName = (slug: string): string => {
  const country = getCountry(slug);
  return country.name;
};


export const getDistrict = (slug: string, country: string): District => {
  // TODO: handle spotlight kenya
  if (country !== 'uganda') throw new Error('we are only dealing with spotlight uganda for now');
  const district: District | void =
    ugDistrictData.districts.find(district => district.slug === slug);
  if (district) return district;
  return {name: slug, slug, id: ''};
};

export const getDistrictName = (slug: string, country: string): string => {
  // TODO: handle spotlight kenya
  if (country !== 'uganda') throw new Error('we are only dealing with spotlight uganda for now');
  const district = getDistrict(slug, country);
  return district.name;
};

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
export type Route = {
  routeAsPath: string,
  routePath: string
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

export type PageMetaArgs = {
  query?: string,
  pathname: string
}

export type PageMeta = {
  title: string,
  image?: string,
  width?: string,
  height?: string,
}

export const createLinkMeta = (args: PageMetaArgs, obj: MenueItem): PageMeta => {
  let title = obj.name;
  if (obj.link === '/uganda') title = getDistrictName(args.query || '', 'uganda');
  if (obj.link === '/') title = 'Development Data Hub';
  if (obj.link === '/country') title = getCountryName(args.query || '');
  return {title, image: '/img/logo.jpg'};
};

export const getPageMeta = (args: PageMetaArgs): PageMeta => {
  const item: ? MenueItem = menueData.mainMenu.reduce((acc: MenueItem[], obj: MenueItem) => {
    if (obj.children) return [...acc, ...obj.children];
    return [...acc, obj];
  }, [])
    .concat([{link: '/country', name: ''}, {link: '/uganda', name: ''}])
    .find(obj => obj.link === args.pathname);

  if (!item) return {title: 'Development Data Hub'};
  const linkMeta = createLinkMeta(args, item);
  return linkMeta;
};

const removeTrailingZero = (value: string): string => {
  const val = Number(value);
  return Math.round(val) === val ? val.toString() : value;
};

export const approximate =
  (value: number | string | null,
    precision: number = 1,
    shouldrRemoveTrailingZero: boolean = false): string => {
    if (value === undefined || value === null) return 'No data';
    const val = Number(value);
    const absValue = Math.abs(val);
    if (absValue < 1e3) {
      const fixed = val.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}` : fixed;
    } else if (absValue >= 1e3 && absValue < 1e6) {
      const newValue = val / 1e3;
      const fixed = newValue.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}k` : `${fixed}k`;
    } else if (absValue >= 1e6 && absValue < 1e9) {
      const newValue = val / 1e6;
      const fixed = newValue.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}m` : `${fixed}m`;
    }
    const newValue = val / 1e9;
    const fixed = newValue.toFixed(precision);
    return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}bn` : `${fixed}bn`;
  };
