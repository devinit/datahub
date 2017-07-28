import React from 'react';
import { storiesOf } from '@storybook/react';
import CountrySearch from '.';

storiesOf('Country Search', module)
  .add('Country Search With Data', () => <CountrySearch />);
