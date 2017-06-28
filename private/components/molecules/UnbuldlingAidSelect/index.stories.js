import React from 'react';

import { storiesOf } from '@storybook/react';
import Select from '.';

storiesOf('Unbundling Aid', module)
  .add('Select', () => (<Select
    active={false}
    bigText="Test"
    options={[{name: '1', value: 'test'}]}
  />));
