import * as React from 'react';
import withApolloAndReduxProvider from '@devinit/dh-base/lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Front from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Front Page', () => <Front state={{}} />);
