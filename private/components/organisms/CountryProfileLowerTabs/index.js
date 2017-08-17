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
// chart IDs
const GOVERNMENT_FINANCE_LOWER = 'government-finance-lower';
const INFLOWS_VS_OUTFLOWS = 'inflows-vs-outflows';
const INTERNATIONAL_RESOURCES = 'international-resources';

export default function CountryProfileLowerTabs(props: Props) {
  const country = getCountry(props.id);
  const pageData = getCountryProfileData(props.id);
  return (
    <Tabs
      textAlign="center"
      selected={!props.chartId || props.chartId === GOVERNMENT_FINANCE_LOWER ? 0 : 1}
    >
      { country && country.countryType === RECIPIENT ?
        <Pane
          label="GOVERNMENT FINANCE"
          id={GOVERNMENT_FINANCE_LOWER}
        >
          <GovernmentFinance
            pageData={pageData}
            countryName={country && country.name ? country.name : props.id}
          >
            <GovernmentFinanceChart
              budgetType={props.budgetType}
              shouldScrollIntoView={props.chartId === GOVERNMENT_FINANCE_LOWER}
              id={props.id}
              year={props.chartId === GOVERNMENT_FINANCE_LOWER ? props.year : null}
              chartId={GOVERNMENT_FINANCE_LOWER}
            />
          </GovernmentFinance>
        </Pane>
        : ''
      }
      <Pane
        label="INTERNATIONAL RESOURCES"
        id={INTERNATIONAL_RESOURCES}
      >
        <InternationalResourcesLower
          pageData={pageData}
          toolTip={data.internationalResources.resourcesOverTime.toolTip}
        >
          <InflowsVsOutflows
            id={props.id}
            shouldScrollIntoView={props.chartId === INFLOWS_VS_OUTFLOWS}
            chartId={INFLOWS_VS_OUTFLOWS}
            year={props.chartId === INFLOWS_VS_OUTFLOWS ? props.year : null}
          />
          <InternationalResourcesChart
            shouldScrollIntoView={props.chartId === INTERNATIONAL_RESOURCES}
            year={props.chartId === INTERNATIONAL_RESOURCES ? props.year : null}
            chartId={INTERNATIONAL_RESOURCES}
            id={props.id}
          />
        </InternationalResourcesLower>
      </Pane>
    </Tabs>
  );
}
