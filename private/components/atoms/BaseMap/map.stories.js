import React from 'react';
import { storiesOf } from '@storybook/react';
import {red, blue, yellow} from 'components/theme/semantic';
import BaseMap from '.';

const data = [
  {id: 'US', value: 50, color: red, name: 'US'},
  {id: 'CN', value: 80, color: blue, name: 'China'},
  {id: 'UG', value: 100, color: yellow, name: 'Uganda'}
];

const viewport = {
  zoom: 1,
  center: [25, 20],
  minZoom: 0.5,
  bounds: [
      [-179, -61], // Southwest coordinates
      [188, 75]  // Northeast coordinates
  ],
  scrollZoom: false,
};

const paint = {data};
storiesOf('Base Maps', module)
  .add('Base Map Atom', () => <BaseMap paint={paint} viewport={viewport} />);
