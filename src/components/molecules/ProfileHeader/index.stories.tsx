import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileHeader from '.';

storiesOf('Profile Headers', module)
  .add('Uganda Profile header', () =>
    (<ProfileHeader
      entity={{name: 'Uganda', id: 'UG', slug: 'uganda'}}
      jumpToSection={console.info}
    />))
  .add('Wakiso Profile header', () =>
    (<ProfileHeader
      currency="UGX"
      spotlightCountry={{name: 'Uganda', id: 'UG', slug: 'uganda', countryType: 'recepient'}}
      currencyOptions={[
        { text: 'constant 2012', value: 'US$' },
        { text: 'Current UGX', value: 'UGX' },
      ]}
      entity={{name: 'Wakiso', id: 'd113', slug: 'wakiso'}}
      onChangeCurrency={console.info}
    />));
