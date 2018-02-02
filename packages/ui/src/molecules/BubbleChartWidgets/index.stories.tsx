import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BubbleChartAnnotation from '../../atoms/BubbleChartAnnotation';
import BubbleChart from '.';
import data from './data';

storiesOf('BubbleChartWidget', module).add('Main', () =>
  <BubbleChart {...data} annotation={<BubbleChartAnnotation />} />,
);
