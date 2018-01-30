import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles tabs uganda', () => <TabsWithData id={'uganda'} />)
  .add('Country Profiles tabs kenya', () => <TabsWithData id={'kenya'} />)
  .add('Country Profiles tabs austria', () => <TabsWithData id={'austria'} />);
