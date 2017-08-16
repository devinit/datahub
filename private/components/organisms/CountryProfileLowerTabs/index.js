// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import GovernmentFinance from 'components/molecules/CountryProfileTabs/GovernmentFinanceLower';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import {RECIPIENT} from 'lib/utils/constants';
import InternationalResourcesLower from 'components/molecules/CountryProfileTabs/InternationalResourcesLower';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';
import type {StateToShare} from 'components/molecules/ChartShare';
import {getCountryProfileData} from 'components/organisms/PagesData';

import {getCountry} from 'lib/utils';
import data from './data';

type Props = StateToShare & {
  id: string,
};

export default function CountryProfileLowerTabs(props: Props) {
  const country = getCountry(props.id);
  const pageData = getCountryProfileData(props.id);
  return (
    <Tabs textAlign="center" selected={0} >
      { country && country.countryType === RECIPIENT ?
        <Pane
          label="GOVERNMENT FINANCE"
          data-focus={props.chartId === 'government-finance-lower'}
          id={'government-finance-lower'}
        >
          <GovernmentFinance
            pageData={pageData}
            chartId="government-finance-lower"
            countryName={country && country.name ? country.name : props.id}
          >
            <GovernmentFinanceChart
              budgetType={props.budgetType}
              id={props.id}
              year={props.startYear}
              chartId="government-finance-lower"
            />
          </GovernmentFinance>
        </Pane>
        : ''
      }
      <Pane
        label="INTERNATIONAL RESOURCES"
        data-focus={props.chartId === 'international-resources-lower'}
        id={'international-resources-lower'}
      >
        <InternationalResourcesLower
          pageData={pageData}
          toolTip={data.internationalResources.resourcesOverTime.toolTip}
        >
          <InflowsVsOutflows id={props.id} startYear={props.startYear} />
          <InternationalResourcesChart id={props.id} />
        </InternationalResourcesLower>
      </Pane>
    </Tabs>
  );
}
