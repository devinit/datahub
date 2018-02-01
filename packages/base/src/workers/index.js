/**
 * runs in the front paget template and pulls in global picture data for client caching
 */
import {getData} from 'lib/utils';

export const cacheData = (uri, data) => {
  data.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator) => {
      const variables = { id: indicator.id };
      getData({query: MapsQuery, variables, uri})
        .then(() => console.log(`cahing map data for ${indicator.id || 'nothing'}`))
        .catch((error) => console.error(`failed to cach data for ${indicator.id || 'nothing'}`, error));
    });
  });
};
