import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('local government Finance Wakiso', () => {
    return <GovernmentFinanceChart country="uganda" id="wakiso" />;
  })
  .add('local government Finance Nairobi', () => {
    return <GovernmentFinanceChart country="kenya" id="nairobi" />;
  });

