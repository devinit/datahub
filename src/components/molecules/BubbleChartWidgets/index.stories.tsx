import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Annotation } from '../../atoms/BubbleChart';
import BubbleChart from '.';
import data from './data';

storiesOf('BubbleChartWidget', module).add('Main', () =>
  <BubbleChart {...data} click={console.info} annotation={<Annotation />} />,
);
