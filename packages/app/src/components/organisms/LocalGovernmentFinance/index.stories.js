import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import GovernmentFinanceChart from '.';
storiesOf('Tabs & Charts', module)
    .addDecorator(withApolloProvider())
    .add('local government Finance Wakiso', () => {
    return React.createElement(GovernmentFinanceChart, { country: "uganda", id: "wakiso" });
})
    .add('local government Finance Nairobi', () => {
    return React.createElement(GovernmentFinanceChart, { country: "kenya", id: "nairobi" });
});
