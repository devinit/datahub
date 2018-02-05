import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '@devinit/dh-base/lib/storybook-addon/apollo';
import InflowsVsOutflows from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Inflows Vs Outflows uganda', () => <InflowsVsOutflows id={'uganda'} />)
  .add('Inflows Vs Outflows Kenya', () => <InflowsVsOutflows id={'kenya'} />);
