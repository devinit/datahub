import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '.';

storiesOf('Tooltip', module)
  .add('Tabs Tooltip', () => (
    <Tooltip
      heading="Indicator heading"
      source="indicator source"
    />)
  );
