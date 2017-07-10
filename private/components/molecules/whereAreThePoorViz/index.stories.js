import React from 'react';

import { storiesOf } from '@storybook/react';
import Viz from '.';

storiesOf('Charts', module)
  .add('Where Are the people Viz', () => <Viz />);
