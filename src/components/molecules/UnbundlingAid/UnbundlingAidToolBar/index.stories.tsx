import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {unbundlingSelections} from '../../../organisms/UnbundlingAid';
import ToolBar from '.';

const selections = unbundlingSelections('oda', 2016);

const props = {
    aidType: 'oda',
    toolBarOptions: selections,
    aid: 'ODA',
    data: {},
    values:  [{key: 'years', value: '2016'}],
    onChange: (key) => (value) => console.info(key, value),
    onMove: console.info
};

storiesOf('Unbundling Aid', module)
  .add('ToolBar', () => <ToolBar {...props} />);
