import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CountrySearch from '.';
storiesOf('Country Search', module)
    .add('globalPicture', () => React.createElement(CountrySearch, { visible: true, placeholder: "Type a country", profile: false }))
    .add('country profile', () => React.createElement(CountrySearch, { visible: true, placeholder: "Uganda", profile: true }))
    .add('Uganda regional profile', () => React.createElement(CountrySearch, { visible: true, placeholder: "Wakiso", profile: true, country: "uganda" }))
    .add('Kenya regional profile', () => React.createElement(CountrySearch, { visible: true, placeholder: "Nairobi", profile: true, country: "kenya" }));
