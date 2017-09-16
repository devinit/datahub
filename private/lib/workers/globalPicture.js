import {getData} from 'lib/utils';
import navData from 'components/organisms/NavBarTabs/data';
import MapsQuery from '../../components/organisms/Map/Maps.graphql';

const cacheGlobalPicData = () => {
  navData.globalPictureThemes.forEach(item => {
    if (!item.indicators) throw Error('indicators missing in navItem');
    item.indicators.forEach((indicator) => {
      const variables = { id: indicator.id };
      getData(MapsQuery, variables)
        .then(() => console.log(`cahing map data for ${indicator.id || 'nothing'}`))
        .catch((error) => console.error(`failed to cach data for ${indicator.id || 'nothing'}`, error));
    });
  });
};

if (process.env.NODE_ENV !== 'test') cacheGlobalPicData();
