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
  viewport: Viewport
}

class Map extends Component {

  constructor(props: Props) {
    super(props);
    this.state = props;
  }
  state = {}

  render() {
    const {viewport, mapStyle} = this.state;

    return (
      <section>
        <MapGL
          {...viewport}
          mapStyle={mapStyle}
          onViewportChange={v => this.setState({viewport: v})}
          preventStyleDiffing={false}
        />
      </section>

    );
  }

}

export default Map;

