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
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import TABS_QUERY from 'Graphql/TabData.graphql';

type TabsProps = {
  loading: boolean,
  ...TabDataQuery
}

const countryProfileTabs = (props: TabsProps) => {
  if (props.loading) return (<p> Loading ...</p>);
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview" key={1}>
        <Overview {...props} />
      </Pane>
      <Pane label="Poverty" key={2}>
        <Poverty {...props} />
      </Pane>
      <Pane label="Population" key={3}>
        <Population {...props} />
      </Pane>
      <Pane label="Government Finance" key={4}>
        <GovernmentFinance {...props} />
      </Pane>
      <Pane label="International Resources" key={5}>
        <InternationalResources {...props} />
      </Pane>
    </Tabs>
  );
};
const withData = graphql(TABS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  }),
  props: ({data}) => {
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }});

export default withData(countryProfileTabs);
