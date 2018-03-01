import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {getDistrictProfileData} from '../../pageData';
import Overview from './Overview';
import PopulationUgTab from './uganda/Population';
import PopulationKeTab from './kenya/Population';
import populationConfig from '../../visbox/spotlightPopulationTabCharts';
import overviewConfig from '../../visbox/spotlightOverviewTabCharts';
const dataKe = require('./testDataKe.json');
const dataUg = require('./testDataUg.json');

const pagesUgData = getDistrictProfileData('wakiso', 'uganda');
const pagesKeData = getDistrictProfileData('nairobi', 'kenya');

storiesOf('SpotlightTabs', module)
    .add('OverviewTab Uganda', () =>
        <Overview
            {...dataUg.data}
            pageData={pagesUgData}
            currency="UgSh"
            config={overviewConfig}
        />)
        .add('OverviewTab Kenya', () =>
        <Overview
            {...dataKe.data}
            pageData={pagesUgData}
            currency="KSh"
            config={overviewConfig}
        />)
        .add('PopulationTab Uganda', () =>
            <PopulationUgTab
                {...dataUg.data}
                pageData={pagesUgData}
                config={populationConfig}
            />)
        .add('PopulationTab Kenya', () =>
        <PopulationKeTab
            {...dataKe.data}
            pageData={pagesKeData}
            config={populationConfig}
        />);
