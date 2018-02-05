import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CountrySearch from '.';

storiesOf('Country Search', module)
  .add('globalPicture', () => <CountrySearch visible placeholder="Type a country" />)
  .add('country profile', () => <CountrySearch visible placeholder="Uganda" profile />)
  .add('Uganda regional profile', () => <CountrySearch visible placeholder="Wakiso" profile country="uganda" />)
  .add('Kenya regional profile', () => <CountrySearch visible placeholder="Nairobi" profile country="kenya" />);
