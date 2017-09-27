import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('Tabs', module)
  .addDecorator(withApolloProvider())
  .add('Government Finance ghana', () => <GovernmentFinanceChart id={'kenya'} />);
