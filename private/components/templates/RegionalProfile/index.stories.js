import React from 'react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import { storiesOf } from '@storybook/react';
import Profile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Regional Profiles', () => <Profile />);
