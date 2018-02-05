import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '@devinit/dh-base/lib/storybook-addon/apollo';
import GovernmentFinanceChart from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Government Finance ghana', () => <GovernmentFinanceChart id={'kenya'} />);
