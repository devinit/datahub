// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import {
  GovernmentFinance,
  GovernmentFinanceLower,
  InternationalResourcesLower,
  InternationalResources,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/CountryProfileTabs';
import povertyConfig from 'visboxConfigs/povertyTabCharts';
import populationConfig from 'visboxConfigs/populationTabCharts';
import govtFinanceConfig from 'visboxConfigs/governmentFinanceTabCharts';
import internationalResourcesConfig from 'visboxConfigs/internationalResourceTabCharts';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import {Div} from 'glamorous';
import {lighterGrey} from 'components/theme/semantic';
import TABS_QUERY from '../../../graphql/TabData.graphql';

type TabsProps = {
  loading: boolean,
  ...TabDataQuery
}

const RECIPIENT = 'recipient';
const DONOR = 'donor';
const countryProfileTabs = (props: TabsProps) => {
  if (props.loading) return (<Div backgroundColor={lighterGrey} width={'100%'} height={'20em'} />);
  if (!props.overViewTab || !props.overViewTab.countryType) console.error('country type missing in overview tab data');
  const countryType = props.overViewTab && props.overViewTab.countryType ?
    props.overViewTab.countryType : RECIPIENT;
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview" id={'overview-tab'}>
        <Overview {...props} />
      </Pane>
      {
        countryType === RECIPIENT ?
          <Pane label="Poverty" id={'poverty-tab'}>
            <Poverty config={povertyConfig} {...props} />
          </Pane> : ''
      }
      <Pane label="Population" id={'population-tab'}>
        <Population config={populationConfig} {...props} />
      </Pane>
      {
        countryType === RECIPIENT ?
          <Pane label="Government Finance" id={'govt-finance-tab'}>
            <GovernmentFinance config={govtFinanceConfig} {...props} />
          </Pane> : ''
      }

      <Pane label="International Resources" id={'internantion-reseources-tab'}>
        <InternationalResources config={internationalResourcesConfig} {...props} />
      </Pane>
    </Tabs>
  );
};
const withData = graphql(TABS_QUERY, {
  options: (props) => {
    return {
      variables: {id: props.id}
    };
  },
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }});

export default withData(countryProfileTabs);
