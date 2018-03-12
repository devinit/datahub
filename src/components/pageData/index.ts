/**
 * exports out page data for various pages after doing any necessary modifications
 */
import {getCountryName} from '../../utils';
import {capitalize} from '@devinit/prelude';
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
      const replaced: string = obj[key] && obj[key].includes(toReplace) ?
                            obj[key].replace(toReplace, replacement) : obj[key];
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
