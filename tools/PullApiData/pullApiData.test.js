import prettyFormat from 'pretty-format';
import COUNTRIES_QUERY from './queries/Countries.graphql';
import {getData} from '.';

describe('pull api data tests', () => {
  it('should return countries used in country search input', async () => {
    const data = await getData(COUNTRIES_QUERY);
    expect(data.countries.length).toBeGreaterThan(2);
    expect(prettyFormat(data.countries[0])).toMatchSnapshot();
  }, 20000);
});
