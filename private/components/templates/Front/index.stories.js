import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Front from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Front Page', () => <Front state={{}} />);
