import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {getCountryProfileData} from '@devinit/dh-base/lib/pageData';
import {getCountry} from '@devinit/dh-base/lib/utils';
import Overview from './Overview';
import PovertyTab from './Poverty';
import overviewConfig from '../../visbox/overviewTabCharts';
import povertyConfig from '../../visbox/povertyTabCharts';

const data = require('./testData.json');

const pageData = getCountryProfileData('uganda');
const country = getCountry('uganda');
const props = data.data;
storiesOf('CountryProfileTabs', module)
    .add('OverviewTab', () =>
        <Overview
            {...props}
            pageData={pageData}
            countryType={country.countryType}
            config={overviewConfig}
        />)
    .add('PovertyTab', () =>
        <PovertyTab
            {...props}
            pageData={pageData}
            countryType={country.countryType}
            config={povertyConfig}
        />);
