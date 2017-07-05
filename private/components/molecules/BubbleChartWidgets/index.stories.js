import React from 'react';
import { storiesOf } from '@storybook/react';
import BubbleChart from '.';
import data from './data';

storiesOf('BubbleChartWidget', module)
  .add('Main', () => <BubbleChart data={data} />);
