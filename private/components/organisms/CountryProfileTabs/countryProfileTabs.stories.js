import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import TabsWithData from '.';

storiesOf('Country Profiles Tabs live', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles tabs uganda', () => <TabsWithData id={'uganda'} />)
  .add('Country Profiles tabs kenya', () => <TabsWithData id={'kenya'} />);
