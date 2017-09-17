// @flow
import type {MenueItem} from 'components/templates/Generic/data';
import data from 'components/templates/Generic/data';
import {getCountryName, getDistrictName} from '.';

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

const createLinkMeta = (args: PageMetaArgs, obj: MenueItem): PageMeta => {
  let title = obj.name;
  if (obj.link === '/uganda') title = getDistrictName(args.query || '', 'uganda');
  if (obj.link === '/country') title = getCountryName(args.query || '');
  return {title, image: '/img/logo.jpg'};
};

const getPageMeta = (args: PageMetaArgs): PageMea => {
  const item: MenuItem | void = data.mainMenu.reduce((acc, obj: MenueItem) => {
    if (obj.children) return [...acc, ...obj.children];
    return [...acc, obj];
  }, [])
    .find(obj => obj.link === args.pathname);

  if (!item) return {title: 'Development Data Hub'};

  const linkMeta = createLinkMeta(args, item);
  return linkMeta;
};

export default getPageMeta;
