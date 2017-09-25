import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileHeader from '.';

storiesOf('Profile Headers', module)
  .add('uganda', () =>
    (<ProfileHeader
      entity={{name: 'Uganda', id: 'UG', slug: 'uganda'}}
      jumpToSection={console.info}
    />))
  .add('Wakiso', () =>
    (<ProfileHeader
      currency="UGX"
      spotlightCountry={{name: 'Uganda', id: 'UG', slug: 'uganda'}}
      currencyOptions={[
        { text: 'constant 2012', value: 'US$' },
        { text: 'Current UGX', value: 'UGX' },
      ]}
      entity={{name: 'Wakiso', id: 'd113', slug: 'wakiso'}}
      onChangeCurrency={console.info}
    />));
