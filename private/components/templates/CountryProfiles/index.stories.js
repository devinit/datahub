import React from 'react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import { storiesOf } from '@storybook/react';
import Profiles from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles', () => <Profiles />);
