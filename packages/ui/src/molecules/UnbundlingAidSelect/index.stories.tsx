import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Select from '.';

storiesOf('Unbundling Aid', module).add('Select', () =>
  <Select
    active={false}
    value="Test"
    smallText="all"
    onChange={console.info}
    options={[{ name: '1', value: 'test', key: 'key' }]}
  />,
);
