import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import InternationalResourcesChart from '.';

storiesOf('Tabs', module)
  .addDecorator(withApolloProvider())
  .add('International Resources', () => <InternationalResourcesChart id={'uganda'} />);
