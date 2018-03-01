import * as React from 'react';
import Tabs from '../../molecules/Tabs';
import Pane from '../../atoms/Pane';
import GovernmentFinance from '../../molecules/CountryProfileTabs/GovernmentFinanceLower';
import GovernmentFinanceChart from '../GovernmentFinance';
import InflowsVsOutflows from '../InflowsVsOutflows';
import {GOVERNMENT_FINANCE_LOWER,
  INFLOWS_VS_OUTFLOWS, INTERNATIONAL_RESOURCES} from '@devinit/dh-base/lib/utils/constants';
import InternationalResourcesLower from '../../molecules/CountryProfileTabs/InternationalResourcesLower';
import InternationalResourcesChart from '../InternationalResourcesChart';
import {StateToShare} from '../../molecules/ChartShare';
import {getCountryProfileData} from '@devinit/dh-base/lib/pageData';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import {getCountry} from '@devinit/dh-base/lib/utils';

import data from './data';

export type Props = StateToShare & {
  id: string,
  selectedTab?: number,
};

export default function CountryProfileLowerTabs(props: Props) {
  const country = getCountry(props.id);
  const pageData = getCountryProfileData(props.id);
  const selectedTab = props.selectedTab ? props.selectedTab : 0;
  return (
    <Tabs
      textAlign="center"
      selected={selectedTab}
    >
      { Number(country.has_domestic_data) ?
        <Pane
          label="GOVERNMENT FINANCE"
          id={GOVERNMENT_FINANCE_LOWER}
        >
          <GovernmentFinance
            pageData={pageData}
            countryName={country && country.name ? country.name : props.id}
          >
            <ErrorBoundary>
              <GovernmentFinanceChart
                budgetType={props.budgetType}
                shouldScrollIntoView={props.chartId === GOVERNMENT_FINANCE_LOWER}
                id={props.id}
                year={props.year}
                chartId={GOVERNMENT_FINANCE_LOWER}
              />
            </ErrorBoundary>
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
          <ErrorBoundary>
            <InflowsVsOutflows
              id={props.id}
              shouldScrollIntoView={props.chartId === INFLOWS_VS_OUTFLOWS}
              chartId={INFLOWS_VS_OUTFLOWS}
              year={props.chartId === INFLOWS_VS_OUTFLOWS ? props.year : 2015} // FIXME: this is a hack
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <InternationalResourcesChart
              shouldScrollIntoView={props.chartId === INTERNATIONAL_RESOURCES}
              year={props.chartId === INTERNATIONAL_RESOURCES ? (props.year as number) : 2015} // FIXME: this is a hack
              chartId={INTERNATIONAL_RESOURCES}
              id={props.id}
            />
          </ErrorBoundary>
        </InternationalResourcesLower>
      </Pane>
    </Tabs>
  );
}
