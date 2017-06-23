// @flow
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {MapPlaceholder} from '../Container';

type Viewport = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  width?: number;
  height?: number;
}

type Props = {
  mapStyle?: string;
  viewport?: Viewport;
  token?: string;
}

class Map extends Component {

  constructor(props?: Props) {
    super(props);
    this.state = {
      ...this.state,
      viewport: {...this.viewport, ...this.props.viewport}
    };
  }
  state = {
    token: process.env.MapboxAccessToken,
    mapStyle: 'http://178.79.185.236:8080/styles/worldgeojson.json',
    viewport: this.viewport
  };

  viewport = {
    latitude: 25,
    longitude: 20,
    zoom: 1,
    bearing: 0,
    scrollZoom: false,
    width: process.browser ? window.innerWidth : 1200,
    height: process.browser && window.innerWidth < 1200 ? 480 : 600
  };

  render() {
    const {viewport, mapStyle, token} = this.state;

    return (
      <section>
        {process.browser ?
        (<MapGL
          {...viewport}
          mapStyle={mapStyle}
          onViewportChange={v => this.setState({viewport: v})}
          mapboxApiAccessToken={token}
          preventStyleDiffing={false}
        />) :
        (<MapPlaceholder />)}
      </section>

    );
  }

}

export default Map;

