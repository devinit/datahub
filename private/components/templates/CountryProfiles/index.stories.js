import React from 'react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import { storiesOf } from '@storybook/react';
import Profiles from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles', () => <Profiles />);
