// import * as React from 'react';
// import { storiesOf } from '@storybook/react';
// import {Viewport, PaintMap} from './types';
// import { red, blue, yellow } from '../../theme/semantic';
// import BaseMap from '.';

// const data = [
//   { id: 'US', value: 50, color: red, name: 'US', slug: 'us', uid: 'xc', year: 2019, detail: null },
//   { id: 'CN', value: 80, color: blue, name: 'China',  slug: 'china',  uid: 'xcx', year: 2019, detail: null },
//   { id: 'UG', value: 100, color: yellow, name: 'Uganda', slug: 'uganda', uid: 'xcx', year: 2019, detail: null },
// ];

// // zoom: number;
// // center: number[];
// // bounds: number[][];
// // maxBounds?: number[][];
// // minZoom: number;
// const viewport: Viewport = {
//   zoom: 1,
//   center: [25, 20],
//   minZoom: 0.5,
//   bounds: [
//     [-179, -61], // Southwest coordinates
//     [188, 75], // Northeast coordinates
//   ],
//   scrollZoom: false,
// };

// const paint: PaintMap = { data };

// storiesOf('Maps', module).add('Base Map Atom', () =>
//   <BaseMap paint={paint} viewport={viewport} />,
// );
