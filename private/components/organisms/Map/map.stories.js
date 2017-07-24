import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-addon/apollo';
import {withApolloAndReduxProvider} from 'lib/storybook-addon/apolloAndRedux';
import Map, {MapWithApollo} from '.';

storiesOf('Maps Live with only Apollo', module)
  .addDecorator(withApolloProvider())
  .add('Depth of Poverty % Map', () => <MapWithApollo id={'data_series.depth_of_extreme_poverty_190'} />)
  .add('Number of Poorest 20%', () => <MapWithApollo id={'data_series.poorest_20_percent'} />)
  .add('fragile states', () => <MapWithApollo id={'data_series.fragile_states'} />)
  .add('latest_census', () => <MapWithApollo id={'data_series.latest_census'} />)
  .add('largest_intl_flow', () => <MapWithApollo id={'data_series.largest_intl_flow'} />)
  .add('uganda_poverty_headcount', () => <MapWithApollo id={'spotlight_on_uganda.uganda_poverty_headcount'} />);

storiesOf('Maps Live with Apollo and Redux', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Depth of Poverty % Map with redux', () => <Map pathName={'/'} />);
