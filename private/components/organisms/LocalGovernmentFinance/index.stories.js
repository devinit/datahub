import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('Tabs', module)
  .addDecorator(withApolloProvider())
  .add('local government Finance', () => <GovernmentFinanceChart country="uganda" id="wakiso" startYear={2015} />);
