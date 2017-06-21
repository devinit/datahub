import React from 'react';

import { storiesOf } from '@storybook/react';
import Map from '.';

const mapProps = {
  viewport: {
    latitude: 25,
    longitude: 20,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    width: window.innerWidth,
    height: window.innerWidth < 1200 ? 480 : 600
  },
  mapStyle: 'http://178.79.185.236:8080/styles/worldgeojson.json',
};

storiesOf('Maps', module)
  .add('Base Map Atom', () => <Map {...mapProps} />);
