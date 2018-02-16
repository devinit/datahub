import {menueData} from '../components/templates/Generic/data';
import {MenueItem} from '@devinit/dh-base/lib/types';
import {capitalize, getCountryName} from '@devinit/dh-base/lib/utils';

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

export const createLinkMeta = (args: PageMetaArgs, obj: MenueItem): PageMeta => {
    let title = obj.name;
    if (obj.link === '/uganda') title = capitalize(args.query || '');
    if (obj.link === '/') title = 'Development Data Hub';
    if (obj.link === '/country') title = getCountryName(args.query || '');
    return {title, image: '/img/logo.jpg'};
};

export const getPageMeta = (args: PageMetaArgs): PageMeta => {
// TODO: add proper types
    const item = menueData.mainMenu.reduce((acc: MenueItem[], obj: MenueItem) => {
        if (obj.children) return [...acc, ...obj.children];
        return [...acc, obj];
    }, [])
        .concat([{link: '/country', name: ''}, {link: '/uganda', name: ''}])
        .find(obj => obj.link === args.pathname);

    if (!item) return {title: 'Development Data Hub'};
    const linkMeta = createLinkMeta(args, item);
    return linkMeta;
};
