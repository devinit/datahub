import React from 'react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import { storiesOf } from '@storybook/react';
import Profile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Regional Profiles', () => <Profile />);
