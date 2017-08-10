// @flow
import React from 'react';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {Container} from 'semantic-ui-react';
import GovernmentFinanceChart from 'components/organisms/GovernmentFinance';
import InflowsVsOutflows from 'components/organisms/InflowsVsOutflows';
import {RECIPIENT} from 'lib/utils/constants';
import countriesData from 'components/organisms/CountrySearchInput/data';
import InternationalResourcesChart from 'components/organisms/InternationalResourcesChart';

type Props = {
  id: string,
};
const countryType = (slug) => {
  const obj = countriesData.countries.find(country => country.slug === slug);
  if (obj) return obj.countryType;
  return RECIPIENT;
};
// TODO: get rid of start year in props
export default (props: Props) =>
  (<Tabs textAlign="center" selected={0} >
    { countryType(props.id) === RECIPIENT ?
      <Pane label="GOVERNMENT FINANCE" id={'government-finance-lower'}>
        <Container>
          <GovernmentFinanceChart startYear={2015} id={props.id} />
        </Container>
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
