import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import Map from '.';

storiesOf('Maps Live with Apollo and Redux', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('global picture default map', () => <Map pathname={'/'} />)
  .add('spotlight default map', () => <Map pathname={'/spotlight-on-uganda'} />)
  .add('Depth of Poverty % Map', () => <Map id={'data_series.depth_of_extreme_poverty_190'} />)
  .add('Number of Poorest 20%', () => <Map id={'data_series.poorest_20_percent'} />)
  .add('Subnational', () => <Map id={'subnational_p20'} />)
  .add('fragile states', () => <Map id={'data_series.fragile_states'} />)
  .add('latest_census', () => <Map id={'data_series.latest_census'} />)
  .add('largest_intl_flow', () => <Map id={'data_series.largest_intl_flow'} />)
  .add('uganda_poverty_headcount', () =>
    <Map id={'spotlight_on_uganda.uganda_poverty_headcount'} />,
  );
