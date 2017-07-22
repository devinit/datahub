import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import MapWithData from '.';

storiesOf('Maps Live DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Depth of Poverty % Map', () => <MapWithData id={'data_series.depth_of_extreme_poverty_190'} />)
  .add('Number of Poorest 20%', () => <MapWithData id={'data_series.poorest_20_percent'} />)
  .add('fragile states', () => <MapWithData id={'data_series.fragile_states'} />)
  .add('latest_census', () => <MapWithData id={'data_series.latest_census'} />)
  .add('largest_intl_flow', () => <MapWithData id={'data_series.largest_intl_flow'} />)
  .add('uganda_poverty_headcount', () => <MapWithData id={'spotlight_on_uganda.uganda_poverty_headcount'} />);

