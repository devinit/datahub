import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '@devinit/dh-base/lib/storybook-addon/apollo';
import config from '@devinit/dh-ui/lib/visboxConfigs/unbundlingTreemapChart';
import Chart from '.';

// Let's see
storiesOf('Unbundling Aid', module)
  .addDecorator(withApolloProvider())
  .add('Chart', () => <Chart aidType={'oda'} startYear={2010} config={config} />);
