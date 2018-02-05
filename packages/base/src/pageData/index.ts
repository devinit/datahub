/**
 * exports out page data for various pages after doing any necessary modifications
 */
import {getCountryName, capitalize} from '../utils';
import { Country } from '../types';

export interface PageUnit {
  id: string;
  title: string;
  narrative?: string;
  donor_title?: string;
}

interface PagesData {
    spotlightDistrict: PageUnit[];
    countryProfile: PageUnit[];
}

interface ReplaceFieldsArgs {
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

export const getDistrictProfileData = (slug: string, country: string, pagesData: PagesData): PageUnit[] => {
  const districtName = capitalize(slug);
  if (!pagesData[country]) throw new Error('District profile page data missing');
  const pageData: PageUnit[] = pagesData[country];
  return replaceFields({pageData, toReplace: '{district}', replacement: districtName});
};

export const getCountryProfileData = (slug: string, countriesData: Country[], pagesData: PagesData): PageUnit[] => {
  const countryName = getCountryName(slug, countriesData);
  if (!pagesData.countryProfile) throw new Error('country profile page data missing');
  const pageData: PageUnit[] = pagesData.countryProfile;
  return replaceFields({pageData, toReplace: '{country}', replacement: countryName});
};
// this is a curried function, it returns another function awaiting an argument

export const getPageUnitById = (data: PageUnit[]) => (id: string): PageUnit => {
  const pageUnit: PageUnit | void = data.find(obj => obj.id === id);
  if (!pageUnit) return { title: 'Error getting title', narrative: 'Error getting narrative for', id, donor_title: ''};
  return pageUnit;
};
