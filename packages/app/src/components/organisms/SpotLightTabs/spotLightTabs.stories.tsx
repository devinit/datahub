import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '@devinit/dh-base/lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('spotlight tabs upper Wakiso', () => <TabsWithData country={'uganda'} id={'wakiso'} currency="US$" />)
  .add('spotlight tabs upper Nairobi', () => <TabsWithData country={'kenya'} id={'nairobi'} currency="US$" />);
