import React from 'react';
import { storiesOf } from '@storybook/react';
import {withApolloProvider} from 'lib/storybook-apollo-addon';
import CountrySearch from '.';

storiesOf('Country Search', module)
  .addDecorator(withApolloProvider())
  .add('Country Search With Data', () => <CountrySearch />);
