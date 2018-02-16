import { RECIPIENT} from '@devinit/dh-base/lib/utils/constants';
import countriesData from '../components/organisms/CountrySearchInput/data';
import keData from '../components/organisms/CountrySearchInput/kenya-data';
import ugData from '../components/organisms/CountrySearchInput/uganda-data';
import {menueData} from '../components/templates/Generic/data';
import {Country, District,  MenueItem} from '@devinit/dh-base/lib/types';
import {capitalize} from '@devinit/dh-base/lib/utils';

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
