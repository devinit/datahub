import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {ProfileSearch, GlobalPictureSearch} from '.';

storiesOf('Search', module)
  .add('globalPicture', () => <GlobalPictureSearch />)
  .add('country profile', () => <ProfileSearch placeholder="Kenya" />)
  .add('Uganda regional profile', () => <ProfileSearch placeholder="Wakiso" country="uganda" />)
  .add('Kenya regional profile', () => <ProfileSearch placeholder="Nairobi" country="kenya" />);
