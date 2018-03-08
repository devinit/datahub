import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import InternationalResourcesChart from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('International Resources', () => <InternationalResourcesChart id={'uganda'} year={2015} />);
