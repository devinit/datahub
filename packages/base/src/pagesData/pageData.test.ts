import * as prettyFormat from 'pretty-format';
import { getDistrictProfileData, getCountryProfileData} from '.';

describe('page data tests', () => {
  it('should return country profile page data', () => {
    const data = getCountryProfileData('uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
  it('should return district page data', () => {
    const data = getDistrictProfileData('wakiso', 'uganda');
    expect(prettyFormat(data)).toMatchSnapshot();
  });
});
