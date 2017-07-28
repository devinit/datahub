import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Country Profiles Tabs live DONOT TEST', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles tabs', () => <TabsWithData id={'uganda'} />);
