import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Tabs', module)
  .addDecorator(withApolloProvider())
  .add('spotlight tabs upper', () => <TabsWithData country={'uganda'} id={'wakiso'} />);
