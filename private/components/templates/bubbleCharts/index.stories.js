import React from 'react';
import { storiesOf } from '@storybook/react';
import BubbleChartTemplate from '.';

storiesOf('Templates', module)
  .add('ODA-donor bubble chart', () => <BubbleChartTemplate pathname="/oda-donor" />)
  .add('Poverty bubble chart', () => <BubbleChartTemplate pathname="/poverty" />);
