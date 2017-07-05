import React from 'react';
import data from 'components/templates/Generic/data';
import { storiesOf } from '@storybook/react';
import BubbleChart from '.';

storiesOf('BubbleChartWidget', module)
  .add('Main', () => <BubbleChart menu={data} />);
