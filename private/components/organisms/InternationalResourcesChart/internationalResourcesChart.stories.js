import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import InternationalResourcesChart from '.';

storiesOf('Country Profile Charts', module)
  .addDecorator(withApolloProvider())
  .add('International Resources', () => <InternationalResourcesChart id={'uganda'} />);
