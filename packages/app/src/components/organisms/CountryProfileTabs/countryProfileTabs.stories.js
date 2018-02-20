import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withApolloProvider from '../../../storybook-addon/apollo';
import TabsWithData from '.';
storiesOf('Tabs & Charts', module)
    .addDecorator(withApolloProvider())
    .add('Country Profiles tabs uganda', () => React.createElement(TabsWithData, { id: 'uganda' }))
    .add('Country Profiles tabs kenya', () => React.createElement(TabsWithData, { id: 'kenya' }))
    .add('Country Profiles tabs austria', () => React.createElement(TabsWithData, { id: 'austria' }));
