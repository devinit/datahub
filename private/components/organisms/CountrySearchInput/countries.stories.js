import React from 'react';
import { storiesOf } from '@storybook/react';
import CountrySearch from '.';

storiesOf('Country Search', module)
  .add('globalPicture', () => <CountrySearch visible placeholder="Type a country" />)
  .add('country profile', () => <CountrySearch visible placeholder="Uganda" profile />);
