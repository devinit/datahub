import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileHeader, { CProps } from '.';

const CountrySearchMock: React.SFC<CProps> = (props) =>
  <div style={{padding: '3em'}}>
    <p>CountrySearch mock for {props.profile || '....'} or {props.country || '....'}</p>
  </div>;

storiesOf('Profile Headers', module)
  .add('Uganda Profile header', () =>
    (<ProfileHeader
      entity={{name: 'Uganda', id: 'UG', slug: 'uganda'}}
      jumpToSection={console.info}
      countrySearch={CountrySearchMock}
    />))
  .add('Wakiso Profile header', () =>
    (<ProfileHeader
      currency="UGX"
      countrySearch={CountrySearchMock}
      spotlightCountry={{name: 'Uganda', id: 'UG', slug: 'uganda', countryType: 'recepient'}}
      currencyOptions={[
        { text: 'constant 2012', value: 'US$' },
        { text: 'Current UGX', value: 'UGX' },
      ]}
      entity={{name: 'Wakiso', id: 'd113', slug: 'wakiso'}}
      onChangeCurrency={console.info}
    />));
