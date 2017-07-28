import React from 'react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import { storiesOf } from '@storybook/react';
import CountryProfile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Country Profile', () => <CountryProfile id={'uganda'} />);
