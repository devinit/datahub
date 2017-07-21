import React from 'react';
import { storiesOf } from '@storybook/react';
import {red} from 'components/theme/semantic';

import PTag from '.';


storiesOf('PTag', module)
  .add('With Primary Color', () => <PTag color={red}>Hello world</PTag>);
