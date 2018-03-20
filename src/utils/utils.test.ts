import 'jest';
import * as prettyFormat from 'pretty-format';
import {  getCountryName, shouldHaveMapboxCss,
  getCountry, getPageMeta, shouldShowTabData } from '.';
import {capitalize } from '@devinit/prelude/lib/strings';
import {getMaxAndMin, approximate} from '@devinit/prelude/lib/numbers';

describe('utils tests', () => {
  it.skip('should return country object', () => {
    const country = getCountry('drc');
    expect(prettyFormat(country)).toMatchSnapshot();
  });
  it('should return country name', () => {
    const name = getCountryName('canada');
    expect(name).toBe('Canada');
  });
  it.skip('should create human friendly numbers i.e 1.5k for 1500', () => {
    const formattedA = [150, 1500, 15000, 200000000].map(val => approximate(val, 0));
    const formattedB = [150, 1500, 15000, 200000000].map(val => approximate(val, 1, true));
    expect(prettyFormat({formattedB, formattedA})).toMatchSnapshot();
  });
  it.skip('should return district name', () => {
    const name = capitalize('wakiso');
    expect(name).toBe('Wakiso');
  });
  it.skip('should return pageMeta for a given page', () => {
    const meta = getPageMeta({query: 'wakiso', pathname: '/uganda'});
    const metaA = getPageMeta({query: undefined, pathname: '/'});
    expect(meta.title).toBe('Wakiso');
    expect(metaA.title).toBe('Development Data Hub');
  });
  it.skip('should return max and min year of a dataset', () => {
    const data = [{year: 2000}, {year: 2010}];
    const [max, min] = getMaxAndMin(data);
    expect(min).toBe(2000);
    expect(max).toBe(2010);
  });
  it.skip('should show government finance tab data or not', () => {
    const dataA = {
      totalRevenue: {
        value: 'No data',
      },
      spendingAllocation: {
        data: []
      }
    };
    const dataB = {
      totalRevenue: {
        value: '3.5bn',
      },
      spendingAllocation: {
        data: [{a: 1, b: 2}]
      }
    };
    const dataC = {
      totalRevenue: {
        value: 'No data',
      },
      spendingAllocation: {
        data: [{a: 1, b: 2}]
      }
    };
    const toShowA = shouldShowTabData(dataA);
    const toShowB = shouldShowTabData(dataB);
    const toShowC = shouldShowTabData(dataC);
    expect(toShowA).toBe(false);
    expect(toShowB).toBe(true);
    expect(toShowC).toBe(true);
  });
  it.skip('should let us know whether to add mabox css on a page or not', () => {
    const shouldBeOnHomePage = shouldHaveMapboxCss('/country/uganda');
    const shouldBeOnHomeCountryPage = shouldHaveMapboxCss('/uganda/wakiso');
    expect(shouldBeOnHomePage).toBe(true);
    expect(shouldBeOnHomeCountryPage).toBe(true);
  });
});
