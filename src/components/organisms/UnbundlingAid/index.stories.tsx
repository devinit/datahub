import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import Chart from '.';

storiesOf('Unbundling Aid', module)
  .addDecorator(withApolloProvider())
  .add('ODA', () => <Chart aidType={'oda'} tourVisible={false} />)
  .add('OOF', () => <Chart aidType={'oof'} tourVisible={false} />);
