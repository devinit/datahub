import React from 'react';

import { storiesOf } from '@storybook/react';
import Slider from '.';

storiesOf('Year Slider', module)
  .add('Datahub Year Slider', () => <Slider minimum={2000} maximum={2020} step={1} position={2016} />);
