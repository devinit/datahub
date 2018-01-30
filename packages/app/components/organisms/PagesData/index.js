// @flow
/**
 * exports out page data for various pages after doing any necessary modifications
 */
import {getCountryName, capitalize} from 'lib/utils';
import data from './data';


export type PageUnit = {
  id: ?string,
  title: ?string,
  narrative: ?string,
  donor_title: ?string
}

const pagesData = (data: {spotlightDistrict: PageUnit[], countryProfile: PageUnit[]});

type ReplaceFieldsArgs = {
  pageData: PageUnit[],
  toReplace: string,
  replacement: string
}

const replaceFields = (args: ReplaceFieldsArgs): PageUnit[] => {
  const {pageData, toReplace, replacement} = args;
  return pageData.map((obj: PageUnit) => {
    // $FlowFixMe: this type is correct, flow just has issues!!! dahh
    return Object.keys(obj).reduce((acc: PageUnit, key: string): PageUnit => {
      const replaced: string = obj[key] && obj[key].includes(toReplace) ?
        obj[key].replace(toReplace, replacement) : obj[key];
      return replaced ? {...acc, [key]: replaced} : {...acc, [key]: replaced};
    }, {});
  });
};

export const getDistrictProfileData = (slug: string, country: string): PageUnit[] => {
  const districtName = capitalize(slug);
  if (!pagesData[country]) throw new Error('District profile page data missing');
  const pageData: PageUnit[] = pagesData[country];
  return replaceFields({pageData, toReplace: '{district}', replacement: districtName});
};

export const getCountryProfileData = (slug: string): PageUnit[] => {
  const countryName = getCountryName(slug);
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
