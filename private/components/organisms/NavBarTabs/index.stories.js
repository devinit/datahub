import React from 'react';
import { storiesOf } from '@storybook/react';
import withReduxProvider from 'lib/storybook-addon/redux';
import SpotlightNavBarTab from './spotlight';
import GlobalPictureNavBarTab from './globalPicture';

storiesOf('Navbar tabs with redux', module)
  .addDecorator(withReduxProvider())
  .add('GlobalPicture Navbar', () => <GlobalPictureNavBarTab />)
  .add('Globalpicture Navbar with state', () => <GlobalPictureNavBarTab state={{indicator: 'data_series.poor_people_190'}} />)
  .add('sportlight Navbar', () => <SpotlightNavBarTab />);
