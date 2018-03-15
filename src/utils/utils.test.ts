import 'jest';
import * as prettyFormat from 'pretty-format';
import {  getCountryName,
  getCountry, getPageMeta, shouldShowTabData,} from '.';
import {capitalize } from '@devinit/prelude/lib/strings';
import {getMaxAndMin, approximate} from '@devinit/prelude/lib/numbers';
import {sendEmail} from '@devinit/prelude/lib/misc';

describe('utils tests', () => {
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
    const name = capitalize('wakiso');
    expect(name).toBe('Wakiso');
  });
  it('should return pageMeta for a given page', () => {
    const meta = getPageMeta({query: 'wakiso', pathname: '/uganda'});
    const metaA = getPageMeta({query: undefined, pathname: '/'});
    expect(meta.title).toBe('Wakiso');
    expect(metaA.title).toBe('Development Data Hub');
  });
  it('should return max and min year of a dataset', () => {
    const data = [{year: 2000}, {year: 2010}];
    const [max, min] = getMaxAndMin(data);
    expect(min).toBe(2000);
    expect(max).toBe(2010);
  });
  it('should show government finance tab data or not', () => {
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
  it.skip('should run without errors while sending email', async () => {
    const response = await sendEmail({
      message: 'test',
      token: 'e2DQks99XapU6w2s1',
      emails: ['epicallan.al@gmail.com'],
      subject: 'test email from datahub'
    });
    expect(response.status).toBe(200);
  });
});
