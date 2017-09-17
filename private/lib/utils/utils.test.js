import prettyFormat from 'pretty-format';
import { getShortURL, getCountryName, getDistrictName, getCountry, approximate} from '.';

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
  it('should create human friendly numbers i.e 1.5k for 1500', () => {
    const formattedA = [150, 1500, 15000, 200000000].map(val => approximate(val, 0));
    const formattedB = [150, 1500, 15000, 200000000].map(val => approximate(val, 1, true));
    expect(prettyFormat({formattedB, formattedA})).toMatchSnapshot();
  });
  it('should return district name', () => {
    const name = getDistrictName('wakiso', 'uganda');
    expect(name).toBe('Wakiso');
  });
  // it('should return pageMeta for a given page', () => {
  //   const meta = getPageMeta({query: 'wakiso', pathname: '/uganda'});
  //   expect(meta.title).toBe('Wakiso');
  // });
});
