import navData from '../components/organisms/NavBarTabs/data';
import { cacheData } from '.';

if (!navData || !navData.globalPictureThemes) {
  throw new Error ('nav data missing for worker');
}
cacheData(navData.globalPictureThemes);
