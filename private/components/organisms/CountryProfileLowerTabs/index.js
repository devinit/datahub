// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import GovernmentFinance from 'components/molecules/CountryProfileTabs/GovernmentFinanceLower';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import {RECIPIENT} from 'lib/utils/constants';
import countriesData from 'components/organisms/CountrySearchInput/data';
import InternationalResourcesLower from 'components/molecules/CountryProfileTabs/InternationalResourcesLower';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';
import {getCountryProfileData} from 'components/organisms/PagesData';
import data from './data';

type Props = {
  id: string,
  startYear?: number,
  flowId?: string
};
const getCountry = (slug): Country | void =>
  countriesData.countries.find(country => country.slug === slug);
// TODO: get rid of start year in props
export default (props: Props) => {
  const country = getCountry(props.id);
  const pageData = getCountryProfileData(props.id);
  return (<Tabs textAlign="center" selected={0} >
    { country && country.countryType === RECIPIENT ?
      <Pane label="GOVERNMENT FINANCE" id={'government-finance-lower'}>
        <GovernmentFinance
          pageData={pageData}
          countryName={country && country.name ? country.name : props.id}
        >
          <GovernmentFinanceChart id={props.id} startYear={props.startYear} />
        </GovernmentFinance>
      </Pane>
      : ''
    }
    <Pane label="INTERNATIONAL RESOURCES" id={'international-resources-lower'}>
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
};
