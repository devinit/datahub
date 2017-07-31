import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import Chart from '.';
import config from '../../../visboxConfigs/unbundlingTreemapChart';

// Let's see
storiesOf('Unbundling Aid', module)
  .addDecorator(withApolloProvider())
  .add('Vis', () => <Chart aidType={'oda'} startYear={2010} config={config} />);
