import * as React from 'react';
import withApolloAndReduxProvider from '../../../storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Front from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Front Page', () => <Front state={ {} } />);
