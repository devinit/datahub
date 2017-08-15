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
import {getCountryProfileData} from 'components/organisms/PagesData';

import {getCountry} from 'lib/utils';
import data from './data';

type Props = {
  id: string,
  startYear?: number,
  chartId?: string,
  flowId?: string,
  selected?: number
};

export default function CountryProfileLowerTabs(props: Props) {
  console.log('props', props);
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
            countryName={country && country.name ? country.name : props.id}
          >
            <GovernmentFinanceChart id={props.id} startYear={props.startYear} />
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
          <InternationalResourcesChart id={props.id} flowId={props.flowId} />
        </InternationalResourcesLower>
      </Pane>
    </Tabs>
  );
}
