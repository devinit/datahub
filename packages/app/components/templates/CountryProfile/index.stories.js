import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import CountryProfile from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Country Profile uganda', () => <CountryProfile id={'uganda'} />)
  .add('Country Profile rwanda', () => <CountryProfile id={'rwanda'} />)
  .add('Country Profile Austria', () => <CountryProfile id={'austria'} />);
