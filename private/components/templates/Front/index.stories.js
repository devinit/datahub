import React from 'react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import { storiesOf } from '@storybook/react';
import Front from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Front Page', () => <Front />);
