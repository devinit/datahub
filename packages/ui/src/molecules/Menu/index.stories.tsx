import * as React from 'react';
import menueData from './testData';
import { storiesOf } from '@storybook/react';
import Menu from '.';

// FIXME: add correct menue test data

storiesOf('Menu', module).add('Datahub Menu', () => <Menu menu={menueData.mainMenu} />);
