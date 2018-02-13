/**
 * runs in the front paget template and pulls in global picture data for client caching
 */
import {getData} from '../utils';

export interface ICacheOpts {
  uri: string;
  query: string;
  api: string;
  data: Array<{indicators: Array<{id: string}>}>;
}
export const cacheData = ({uri, query, api, data}: ICacheOpts) => {
  data.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator) => {
      const variables = { id: indicator.id };
      getData({query, variables})
        .then(() => console.log(`cahing map data for ${indicator.id || 'nothing'}`))
        .catch((error) => console.error(`failed to cach data for ${indicator.id || 'nothing'}`, error));
    });
  });
};
