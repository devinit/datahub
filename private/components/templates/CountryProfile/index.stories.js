import React from 'react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import { storiesOf } from '@storybook/react';
import CountryProfile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Country Profile', () => <CountryProfile id={'uganda'} />);
