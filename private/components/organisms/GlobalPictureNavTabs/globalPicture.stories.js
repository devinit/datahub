import React from 'react';
import { storiesOf } from '@storybook/react';
import withReduxProvider from 'lib/storybook-addon/redux';
import NavBarTab from '.';

storiesOf('Navbar tabs with redux', module)
  .addDecorator(withReduxProvider())
  .add('Global picture nav bar tab', () => <NavBarTab state={{indicator: 'data_series.poor_people_190'}} />);
