// @flow
/**
 * exports out page data for various pages after doing any necessary modifications
 */
import {getCountryName} from 'lib/utils';
import data from './data';

const pagesData = (data: PageDataQuery);

export type PageUnit = {|
  id: ?string,
  title: ?string,
  narrative: ?string,
|}
type ReplaceFieldsArgs = {
  pageData: PageUnit[],
  toReplace: string,
  replacement: string
}
const replaceFields = (args: ReplaceFieldsArgs): PageUnit[] => {
  const {pageData, toReplace, replacement} = args;
  return pageData.map((obj: PageUnit) => {
    const title = obj.title && obj.title.includes(toReplace) ?
      obj.title.replace(toReplace, replacement) : obj.title;
    const narrative = obj.narrative && obj.narrative.includes(toReplace) ?
      obj.narrative.replace(toReplace, replacement) : obj.narrative;
    return {id: obj.id, title, narrative};
  });
};

export const getCountryProfileData = (slug: string): PageUnit[] => {
  const countryName = getCountryName(slug);
  if (!pagesData.countryProfile) throw new Error('country profile page data missing');
  const pageData: PageUnit[] = pagesData.countryProfile;
  return replaceFields({pageData, toReplace: '{country}', replacement: countryName});
};
// this is a curried function, it returns another function awaiting an argument
export const getPageUnitById = (data: PageUnit[]) =>
  (id: string): PageUnit => {
    const pageUnit: PageUnit | void = data.find(obj => obj.id === id);
    if (!pageUnit) return { title: 'Error getting title', narrative: 'Error getting narrative for', id};
    return pageUnit;
  };
