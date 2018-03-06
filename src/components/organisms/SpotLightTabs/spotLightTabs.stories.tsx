import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Wakiso with apollo', () => <TabsWithData country={'uganda'} id={'wakiso'} currency="US$" />)
  .add('Nairobi with apollo', () => <TabsWithData country={'kenya'} id={'nairobi'} currency="US$" />);
