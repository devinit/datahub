// @flow
import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {MapPlaceholder} from '../Container';

type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  width: number;
  height: number;
}

type Props = {
  mapStyle: string;
  viewport: Viewport;
  token: string;
}

class Map extends Component {

  constructor(props: Props) {
    super(props);
    this.state = props;
  }
  state = {}

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

