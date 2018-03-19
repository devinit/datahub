import * as prettyFormat from 'pretty-format';
import { getDistrictProfileData, getCountryProfileData, getSpotlightPageData,
  getUnbundlingAidPageData, getProfilePageData, getDistrictProfilePageData} from '.';

describe('page data tests', () => {
  it.skip('should return country profile page data', () => {
    const data = getCountryProfileData('uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it.skip('should return district page data', () => {
    const data = getDistrictProfileData('wakiso', 'uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it.skip('should return spotlightPage page data', () => {
    const data = getSpotlightPageData('uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it.skip('should return unbundlingAid page data', () => {
    const data = getUnbundlingAidPageData('oofs');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it('should return ProfilePageData page data', () => {
    const data = getProfilePageData('uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it.skip('should return DistrictProfilePageData page data', () => {
    const data = getDistrictProfilePageData('Wakiso');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
});
