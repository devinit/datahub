import prettyFormat from 'pretty-format';
import { getShortURL, getCountryName, getDistrictName, getCountry} from '.';

describe('utils tests', () => {
  it(
    'should return short url of a long url',
    async () => {
      const url = await getShortURL('http://212.71.254.23:9999/country/uganda?state={"year":2015,"budgetType":"actual"}');
      expect(url).toMatchSnapshot();
    },
    20000,
  );
  it('should return country object', () => {
    const country = getCountry('drc');
    expect(prettyFormat(country)).toMatchSnapshot();
  });
  it('should return country name', () => {
    const name = getCountryName('drc');
    expect(name).toBe('DRC');
  });
  it('should return district name', () => {
    const name = getDistrictName('wakiso', 'uganda');
    expect(name).toBe('Wakiso');
  });
});
