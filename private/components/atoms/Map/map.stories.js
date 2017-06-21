import React from 'react';

import { storiesOf } from '@storybook/react';
import Map from '.';

const mapProps = {
  viewport: {
    latitude: 25,
    longitude: 20,
    zoom: 1,
    bearing: 0,
    pitch: 0,
    width: process.browser ? window.innerWidth : 1200,
    height: process.browser && window.innerWidth < 1200 ? 480 : 600
  },
  token: 'pk.eyJ1IjoiYWttaWxsZXIwMSIsImEiOiJjaXJmMTExYXcwMDUyZ2VuZXVudGs2NXN6In0.UCGi9Cx5COTKxzSiDbusCg',
  mapStyle: 'mapbox://styles/akmiller01/ciyw0iolu00252snt7hzo1fny',
};

storiesOf('Maps', module)
  .add('Base Map Atom', () => <Map {...mapProps} />);
