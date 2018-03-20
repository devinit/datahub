/**
 * exports out page data for various pages after doing any necessary modifications
 */
import {getCountryName} from '../../utils';
import {capitalize} from '@devinit/prelude/lib/strings';
import data from './data';

export interface PageUnit {
  id: string;
  title: string;
  narrative?: string;
  donor_title?: string;
}

export interface PageData {
    spotlightDistrict: PageUnit[];
    countryProfile: PageUnit[];
}

export interface ReplaceFieldsArgs {
  pageData: PageUnit[];
  toReplace: string;
  replacement: string;
}

const replaceFields = (args: ReplaceFieldsArgs): PageUnit[] => {
  const {pageData, toReplace, replacement} = args;
  return pageData.map((obj: PageUnit) => {
    return Object.keys(obj).reduce((acc: PageUnit, key: string): PageUnit => {
    const toReplaceRegx = new RegExp(toReplace, 'g');
    const replaced: string = obj[key] && obj[key].includes(toReplace) ?
                            obj[key].replace(toReplaceRegx, replacement) : obj[key];
    return replaced ? {...acc, [key]: replaced} : {...acc, [key]: replaced};
    }, {} as PageUnit);
  });
};

export const getDistrictProfileData = (slug: string, country: string): PageUnit[] => {
  const districtName = capitalize(slug);
  if (!data[country]) throw new Error('District profile page data missing');
  const pageData: PageUnit[] = data[country];
  return replaceFields({pageData, toReplace: '{district}', replacement: districtName});
};

export const getCountryProfileData = (slug: string): PageUnit[] => {
  const countryName = getCountryName(slug);
  if (!data.countryProfile) throw new Error('country profile page data missing');
  const pageData: PageUnit[] = data.countryProfile;
  return replaceFields({pageData, toReplace: '{country}', replacement: countryName});
};
// this is a curried function, it returns another function awaiting an argument

export const getPageUnitById = (_data: PageUnit[]) => (id: string): PageUnit => {
  const pageUnit: PageUnit | undefined = _data.find(obj => obj.id === id);
  if (!pageUnit) return { title: 'Error getting title', narrative: 'Error getting narrative for', id, donor_title: ''};
  return pageUnit;
};
export const getSpotlightPageData = (slug: string): string => {
  const countryName = getCountryName(slug);
  if (!data.spotlight) throw new Error('country profile page data missing');
  const pageData: PageUnit[] = data.spotlight;
  const newData: PageUnit[] = replaceFields({pageData, toReplace: '{country}', replacement: countryName});
  const region = slug === 'uganda' ? 'district' : 'county';
  const obj = replaceFields({pageData: newData, toReplace: '{region}', replacement: region})[0];
  if (!obj) throw Error ('Missing spotlight page data');
  return obj.narrative || 'Missing spotlight narrative contact';
};
export const getUnbundlingAidPageData = (aidType: string): string => {
  const aid = aidType === 'oda' ? 'ODA' : 'OOFs';
  if (!data.unbundlingAid) throw new Error('unbundlingAid page data missing');
  const pageData: PageUnit[] = data.unbundlingAid;
  const arr = replaceFields({pageData, toReplace: '{aid}', replacement: aid});
  const obj = arr.find((item) => item.id === 'click-boxes');
  if (!obj) throw Error ('Missing unbundling page data');
  return obj.narrative || 'Unbundling Aid is missing requred narrative';
};
export const getProfilePageData = (countryName: string): PageUnit[] => {
  if (!data.profileHeader) throw new Error('profile header page data missing');
  const pageData: PageUnit[] = data.profileHeader;
  return replaceFields({pageData, toReplace: '{country}', replacement: countryName});
};
export const getDistrictProfilePageData = (countrySlug: string, entityName: string): string => {
  if (!data.profileHeader) throw new Error('District profile page data missing');
  const pageData: PageUnit[] = data.profileHeader;
  const newData: PageUnit[] = replaceFields({pageData, toReplace: '{region}', replacement: entityName});
  const region = countrySlug === 'uganda' ? 'district' : 'county';
  const obj = replaceFields({pageData: newData, toReplace: '{area}', replacement: region})[0];
  if (!obj) throw Error ('Missing spotlightProfile page data');
  return obj.narrative || 'Missing spotlightProfilePage narrative contact';
};
