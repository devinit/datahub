import React from 'react';
// import {menueData} from 'components/templates/Generic/data';
import { storiesOf } from '@storybook/react';
import Menu from '.';

storiesOf('Menu', module).add('Desktop Menu', () => <Menu menu={menueData.mainMenu} />);
