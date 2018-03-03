/**
 * runs in the front paget template and pulls in global picture data for client caching
 */
import { createApolloFetch } from 'apollo-fetch';
import {MAP_QUERY} from '../components/organisms/Map/query.graphql';

declare const API: string;

const apolloFetch = createApolloFetch({ uri: API });

export const cacheData = (data) => {
  data.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator) => {
      const variables = { id: indicator.id };
      apolloFetch({query: MAP_QUERY, variables})
        .then(() => console.log(`cahing map data for ${indicator.id || 'nothing'}`))
        .catch((error) => console.error(`failed to cach data for ${indicator.id || 'nothing'}`, error));
    });
  });
};
