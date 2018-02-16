import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import CountryProfileLowerTabs from '.';

storiesOf('Tabs & Charts', module)
  .addDecorator(withApolloProvider())
  .add('Country Profiles Lower tabs uganda', () =>
    (<CountryProfileLowerTabs
      id="uganda"
      chartId={'government-finance-lower'}
    />))
  .add('Country Profiles Lower tabs rwanda', () =>
    (<CountryProfileLowerTabs
      id="rwanda"
      chartId={'government-finance-lower'}
    />))
  .add('Country Profiles Lower tabs austria', () => <CountryProfileLowerTabs id="austria" />);
