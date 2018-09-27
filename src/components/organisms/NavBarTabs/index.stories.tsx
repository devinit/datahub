import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withReduxProvider from '../../../storybook-addon/redux';
import SpotlightNavBarTabKe from './spotlightKe';
import SpotlightNavBarTabUg from './spotlightUg';
import GlobalPictureNavBarTab from './globalPicture';

storiesOf('Navbar tabs with redux', module)
  .addDecorator(withReduxProvider())
  .add('GlobalPicture Navbar', () => <GlobalPictureNavBarTab />)
  .add('Globalpicture Navbar with state', () =>
    <GlobalPictureNavBarTab state={ { indicator: 'data_series.poor_people_190' } } />)
  .add('sportlight Navbar Kenya', () => <SpotlightNavBarTabKe />)
  .add('sportlight Navbar Uganda', () => <SpotlightNavBarTabUg />);
