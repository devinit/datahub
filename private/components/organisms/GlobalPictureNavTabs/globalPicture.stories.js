import React from 'react';
import { storiesOf } from '@storybook/react';
import {withReduxProvider} from 'lib/storybook-addon/redux';
import NavBarTab from '.';

storiesOf('Navbar tabs with redux', module)
  .addDecorator(withReduxProvider())
  .add('Navbar with redux', () => <NavBarTab />);

