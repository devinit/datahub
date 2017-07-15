// @flow
import React from 'react';
import {
  Education,
  Health,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/RegionalProfileTabs';
import Tabs from 'components/molecules/Tabs';
import Pane from 'components/atoms/Pane';


type WrapperProps = {
  loading: boolean,
  ...SpotLightTabDataQuery
}

const countryProfileTabs = (props: WrapperProps) => {
  console.log('in spotlight tabs', props);
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
export default countryProfileTabs;
