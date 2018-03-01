import 'jest';
import * as prettyFormat from 'pretty-format';
// import COUNTRIES_QUERY from '../pullApiData/queries/Countries.graphql';
import { getCountry } from '.';

describe('utils test', () => {
  it('should return a country details', () => {
      const data = getCountry('uganda');
      expect(prettyFormat(data)).toMatchSnapshot();
    },
    100000,
  );
});
