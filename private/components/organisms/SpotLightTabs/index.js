// @flow
import React from 'react';
import { graphql} from 'react-apollo';
import {
  Education,
  Health,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/SpotLightTabs';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';
import TabsPlaceHolder from 'components/molecules/TabsPlaceHolder';
import TABS_QUERY from '../../../graphql/SpotlightTabData.graphql';

type WrapperProps = {
  loading: boolean,
  ...SpotLightTabDataQuery
}

const spotlightTabs = (props: WrapperProps) => {
  if (props.loading || !props.overviewTabRegional || !props.populationTabRegional
  || !props.educationTabRegional || !props.healthTabRegional) {
    return (<TabsPlaceHolder loading={props.loading} />);
  }
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview" id="spotlight-overview">
        <Overview {...props} />
      </Pane>
      <Pane label="Poverty" id="spotlight-poverty">
        <Poverty {...props} />
      </Pane>
      <Pane label="Population" id="spotlight-population">
        <Population {...props} />
      </Pane>
      <Pane label="Health" id="spotlight-health">
        <Health {...props} />
      </Pane>
      <Pane label="Education" id="spotlight-education">
        <Education {...props} />
      </Pane>
    </Tabs>
  );
};

const withData = graphql(TABS_QUERY, {
  options: (props) => ({
    variables: {
      id: props.id,
      country: props.country
    }
  }),
  props: ({data}) => {
    const {error} = data;
    if (error) throw Error(error);
    return data;
  }});

export default withData(spotlightTabs);
