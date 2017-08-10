// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import {
  GovernmentFinance,
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
import {Section} from 'glamorous';
import Pane from 'components/atoms/Pane';
import { RECIPIENT } from 'lib/utils/constants';
import TabsPlaceHolder from 'components/molecules/TabsPlaceHolder';
import TABS_QUERY from '../../../graphql/TabData.graphql';
import overviewConfig from '../../../visboxConfigs/overviewTabCharts';

type TabsProps = {
  loading: boolean,
  ...TabDataQuery,
};

const countryProfileTabs = (props: TabsProps) => {
  if (props.loading || !props.overviewTab || !props.populationTab) {
    return <TabsPlaceHolder loading={props.loading} />;
  }
  const countryType =
    props.overviewTab && props.overviewTab.countryType ? props.overviewTab.countryType : RECIPIENT;
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview" id={'overview-tab'}>
        <Overview {...props} countryType={countryType} config={overviewConfig} />
      </Pane>
      {countryType === RECIPIENT
        ? <Pane label="Poverty" id={'poverty-tab'}>
          <Poverty config={povertyConfig} {...props} />
        </Pane>
        : ''}
      <Pane label="Population" id={'population-tab'}>
        <Population config={populationConfig} {...props} />
      </Pane>
      {countryType === RECIPIENT
        ? <Pane label="Government Finance" id={'govt-finance-tab'}>
          <GovernmentFinance config={govtFinanceConfig} {...props} />
        </Pane>
        : ''}
      <Pane label="International Resources" id={'internantion-reseources-tab'}>
        <InternationalResources config={internationalResourcesConfig} {...props} />
      </Pane>
    </Tabs>
  );
};
const withData = graphql(TABS_QUERY, {
  options: props => {
    return {
      variables: { id: props.id },
    };
  },
  props: ({ data }) => {
    const { error } = data;
    if (error) throw Error(error);
    return data;
  },
});

export default withData(countryProfileTabs);
