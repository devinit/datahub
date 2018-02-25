import {menueData} from '../components/templates/Generic/data';
import {IProcess} from '@devinit/dh-base/lib/types';
import {MenuItem} from '@devinit/dh-ui/lib/molecules/Menu/types';
import {capitalize, getCountryName} from '@devinit/dh-base/lib/utils';
import * as localforage from 'localforage';
import { createApolloFetch,  FetchResult } from 'apollo-fetch';

declare var process: IProcess;

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

const apolloFetch = createApolloFetch({ uri: process.env.config.api });

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
        console.error(error, 'localforage: ');
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
                console.error(error, 'getData function: ');
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
        console.error(error, 'cache mapdata: ');
    }
}
};
