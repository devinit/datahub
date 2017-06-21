// @flow
/* eslint-disable no-underscore-dangle, max-len, react/no-unescaped-entities */
import React from 'react';
import { rehydrate } from 'glamor';
import withData from 'lib/withData';
import Map from 'components/atoms/Map';
import App from 'components/templates/Generic';
import 'lib/offline-install'; // Get our service worker on the page

type Props = {
  url: {pathname: string}
}
// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids);
}

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

export default withData((props: Props) => {
  return (
    <App pathName={props.url.pathname}>
      <Map {...mapProps} />
    </App>
  );
});
