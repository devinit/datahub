import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import CountryProfileLowerTabs from '.';
storiesOf('Tabs & Charts', module)
    .addDecorator(withApolloProvider())
    .add('Country Profiles Lower tabs uganda', () => (React.createElement(CountryProfileLowerTabs, { id: "uganda", chartId: 'government-finance-lower' })))
    .add('Country Profiles Lower tabs rwanda', () => (React.createElement(CountryProfileLowerTabs, { id: "rwanda", chartId: 'government-finance-lower' })))
    .add('Country Profiles Lower tabs austria', () => React.createElement(CountryProfileLowerTabs, { id: "austria" }));
