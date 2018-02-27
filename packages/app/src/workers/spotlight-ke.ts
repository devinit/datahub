/**
 * runs in the front paget template and pulls in global picture data for client caching
 */
import navData from '../components/organisms/NavBarTabs/kenya';
import {cacheData} from '.';


cacheData(navData.spotlightThemes);
