// @flow
import React from 'react';
import {
  GovernmentFinance,
  GovernmentFinanceLower,
  InternationalResourcesLower,
  InternationalResources,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/CountryProfileTabs';
import type {Props as InternationalProps} from 'components/molecules/CountryProfileTabs/InternationalResources';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';

type WrapperProps = {
  loading: boolean,
  data: InternationalProps
}

const countryProfileTabs = (props: WrapperProps) => {
  console.log('tabs', props);
  if (props.loading) return (<p> Loading ...</p>);
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview">
        <Overview />
      </Pane>
      <Pane label="Poverty">
        <Poverty />
      </Pane>
      <Pane label="Population">
        <Population />
      </Pane>
      <Pane label="Government Finance">
        <GovernmentFinance />
      </Pane>
      <Pane label="International Resources" GNI={props.data.GNI}>
        <InternationalResources />
      </Pane>
    </Tabs>
  );
};
export default countryProfileTabs;
