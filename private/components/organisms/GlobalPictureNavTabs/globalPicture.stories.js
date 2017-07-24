import React from 'react';
import { storiesOf } from '@storybook/react';
import {withReduxProvider} from 'lib/storybook-addon/redux';
import NavBarTabOrgan from '.';

storiesOf('Global Picture Navbar tab with redux', module)
  .addDecorator(withReduxProvider())
  .add('Navbar with redux', () => <NavBarTabOrgan />);

