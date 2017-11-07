import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Profile from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Regional Profiles Wakiso', () =>
    (<Profile
      id="wakiso"
      country="uganda"
      currencyCode="UGX"
      currencyUSD="constant 2015 USD"
    />))
  .add('Regional Profiles Nairobi', () =>
    (<Profile
      id="nairobi"
      country="kenya"
      currencyCode="KEX"
      currencyUSD="constant 2015 USD"
    />));

