import React from 'react';
import { storiesOf } from '@storybook/react';
import {red, blue, yellow} from 'components/theme/semantic';
import Map from '.';

const data = [
  {id: 'US', value: 50, color: red},
  {id: 'CN', value: 80, color: blue},
  {id: 'UG', value: 100, color: yellow}
];
const paint = {data};
storiesOf('Maps DONOT TEST', module)
  .add('Base Map Atom', () => <Map paint={paint} />);
