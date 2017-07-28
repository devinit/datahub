import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Spotlight from '.';

storiesOf('Spotlight Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Spot Light', () => <Spotlight />);
