// @flow
import {getCountryName, getDistrictName} from '.';

export type PageMetaArgs = {
  query: string,
  pathname: string
}
export type PageMeta = {
  title: string,
  image?: string,
  width?: string,
  height?: string,
}
export type MetaMapping = {
  [pathname: string]: PageMeta
}
const metaMapping = (args: PageMetaArgs): MetaMapping => ({
  '/': {
    title: 'Development Data Hub',
    image: '',
    width: '',
    height: '',
  },
  '/country': {
    title: getCountryName(args.query),
    image: '',
    width: '',
    height: '',
  },
  '/uganda': {
    title: getDistrictName(args.query, 'uganda'),
    image: '',
    width: '',
    height: '',
  }
});

const getPageMeta = (args: PageMetaArgs): PageMeta => {
  const mapping = metaMapping(args);
  return mapping[args.pathname] || {title: 'Development Data Hub'};
};

export default getPageMeta;
