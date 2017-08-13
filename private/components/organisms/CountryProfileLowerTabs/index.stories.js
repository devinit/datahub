import React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from 'lib/storybook-addon/apollo';
import CountryProfileLowerTabs from '.';

storiesOf('Tabs DontTest', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles Lower tabs uganda', () => <CountryProfileLowerTabs id={'uganda'} />)
  .add('Country Profiles Lower tabs rwanda', () => <CountryProfileLowerTabs id={'rwanda'} />)
  .add('Country Profiles Lower tabs austria', () => <CountryProfileLowerTabs id={'austria'} />);
