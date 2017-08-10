import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import CountryProfile from '.';

storiesOf('Templates DontTest', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Country Profile uganda', () => <CountryProfile id={'uganda'} />)
  .add('Country Profile Austria', () => <CountryProfile id={'austria'} />);
