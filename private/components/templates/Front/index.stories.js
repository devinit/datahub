import React from 'react';
import {withApolloProvider} from 'lib/storybook-addon/apollo';
import { storiesOf } from '@storybook/react';
import Front from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Front Page', () => <Front />);
