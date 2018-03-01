import {menueData} from '../components/templates/Generic/data';
import {IProcess} from '@devinit/dh-base/lib/types';
import {MenuItem} from '../components/molecules/Menu/types';
import {capitalize, getCountryName} from '@devinit/dh-base/lib/utils';
import * as localforage from 'localforage';
import { createApolloFetch,  FetchResult } from 'apollo-fetch';

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
    if (obj.link === '/uganda') title = capitalize(args.query || '');
    if (obj.link === '/') title = 'Development Data Hub';
    if (obj.link === '/country') title = getCountryName(args.query || '');
    return {title, image: '/img/logo.jpg'};
};

export const getPageMeta = (args: PageMetaArgs): PageMeta => {
// TODO: add proper types
    const item = menueData.menu.reduce((acc: MenuItem[], obj: MenuItem) => {
            if (obj.children) return [...acc, ...obj.children];
            return [...acc, obj];
        }, [])
        .concat([{link: '/country', name: ''}, {link: '/uganda', name: ''}])
        .find(obj => obj.link === args.pathname);

    if (!item) return {title: 'Development Data Hub'};
    const linkMeta = createLinkMeta(args, item);
    return linkMeta;
};

export async function shouldPurgeCache(): Promise<boolean> {
    const storedVersion = await localforage.getItem('version');
    return !storedVersion || storedVersion !== APP_VERSION;
  }

export async function getLocalStorageInstance(): Promise<any> {
    if (!process.browser) return Promise.resolve(null);
    try {
            const shouldPurge = await shouldPurgeCache();
            if (!shouldPurge) return localforage;
            await localforage.clear();
            await localforage.setItem('version', APP_VERSION);
            return localforage;
        } catch (error) {
                console.error(error, 'localforage: ');
                await localforage.clear(); // cache is possibly full so lets clear it
                return localforage;
        }
}

export interface IgetData {
    query: string;
    variables: any;
  }

export async function getData<T>(opts: IgetData): Promise<T> {
    try {
        const {query, variables} = opts;
        const key = `${JSON.stringify(query)}${JSON.stringify(variables)}`;
        let storage: any = null;
        if (!API || !APP_VERSION) {
            throw new Error('missing env config, check package.json for env virables & next.config');
        }
        const apolloFetch = createApolloFetch({ uri: API });
        if (process.browser) {
            storage = await getLocalStorageInstance();  // @ts-ignore
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
          worker.onmessage = (event) => console.log(event);
        }
      } catch (error) {
        if (error) console.error(error, 'cache mapdata: ');
      }
    }
  };
