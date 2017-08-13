// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {Container} from 'semantic-ui-react';
import GovernmentFinance from 'components/molecules/CountryProfileTabs/GovernmentFinanceLower';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import {RECIPIENT} from 'lib/utils/constants';
import countriesData from 'components/organisms/CountrySearchInput/data';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';

type Props = {
  id: string,
};
const getCountry = (slug): Country | void =>
  countriesData.countries.find(country => country.slug === slug);


// TODO: get rid of start year in props
export default (props: Props) => {
  const country = getCountry(props.id);
  return (<Tabs textAlign="center" selected={0} >
    { country && country.countryType === RECIPIENT ?
      <Pane label="GOVERNMENT FINANCE" id={'government-finance-lower'}>
        <GovernmentFinance countryName={country && country.name ? country.name : props.id}>
          <GovernmentFinanceChart startYear={2015} id={props.id} />
        </GovernmentFinance>
      </Pane>
      : ''
    }
    <Pane label="INTERNATIONAL RESOURCES" id={'international-resources-lower'}>
      <Container>
        <InflowsVsOutflows id={props.id} />
        <InternationalResourcesChart id={props.id} startYear={2015} />
      </Container>
    </Pane>
  </Tabs>
  );
};
