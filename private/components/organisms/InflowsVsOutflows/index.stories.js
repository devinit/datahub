import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import InflowsVsOutflows from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Inflows Vs Outflows', () => <InflowsVsOutflows id={'uganda'} />);
