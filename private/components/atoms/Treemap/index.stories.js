import React from 'react';
import { storiesOf } from '@storybook/react';
import data from './data';
import Treemap from '.';

storiesOf('Treemap', module).add('treemap', () =>
  <Treemap data={data} />,
);
