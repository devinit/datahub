import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import GovernmentFinanceChart from '.';
import Chart from '../../molecules/MultiLinePartition';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Government Finance ghana', () =>
    <GovernmentFinanceChart id={ 'kenya' } chartId="govmtID"><Chart { ...{} as any }/></GovernmentFinanceChart>
  );
