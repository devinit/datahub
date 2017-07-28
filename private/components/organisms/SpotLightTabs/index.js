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
import TABS_QUERY from '../../../graphql/SpotlightTabData.graphql';

type WrapperProps = {
  loading: boolean,
  ...SpotLightTabDataQuery
}

const spotlightTabs = (props: WrapperProps) => {
  if (props.loading) return (<p> Loading ...</p>);
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview">
        <Overview {...props} />
      </Pane>
      <Pane label="Poverty">
        <Poverty {...props} />
      </Pane>
      <Pane label="Population">
        <Population {...props} />
      </Pane>
      <Pane label="Health">
        <Health {...props} />
      </Pane>
      <Pane label="Education">
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
    const {error, loading} = data;
    if (error) throw Error(error);
    return data;
  }});

export default withData(spotlightTabs);
