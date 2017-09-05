import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('tabs', module)
  .addDecorator(withApolloProvider())
  .add('local government Finance', () => <GovernmentFinanceChart country="uganda" id="wakiso" />);
