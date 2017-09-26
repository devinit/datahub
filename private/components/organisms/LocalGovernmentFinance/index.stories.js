import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import config from 'visboxConfigs/localLinePartition';
import GovernmentFinanceChart from '.';

storiesOf('Tabs', module)
  .addDecorator(withApolloProvider())
  .add('local government Finance', () => <GovernmentFinanceChart config={config} country="uganda" id="wakiso" />);
