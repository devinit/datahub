import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Profile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Regional Profiles', () => <Profile id="wakiso" country="uganda" />);
