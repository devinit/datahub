import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('Country Profile Charts', module)
  .addDecorator(withApolloProvider())
  .add('Government Finance', () => <GovernmentFinanceChart id={'uganda'} />);
