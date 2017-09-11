import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Spotlight from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Spot Light', () => <Spotlight state={{}} />);
