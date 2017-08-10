import React from 'react';
import data from 'components/templates/Generic/data';
import { storiesOf } from '@storybook/react';
import Menu from '.';

storiesOf('Menu', module).add('Datahub Menu', () => <Menu menu={data.mainMenu} />);
