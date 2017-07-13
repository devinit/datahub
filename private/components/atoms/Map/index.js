// @flow
import React, {PureComponent} from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {MapPlaceholder} from '../Container';

type Viewport = {
  zoom: number;
  center: number[];
  width: number;
  height: number;
  attributionControl: boolean;
  bounds: number[][];
}

type Props = {
  mapStyle?: string;
  viewport?: Viewport
}

type State = {
  token: string;
  mapStyle: string;
  viewport: Viewport
}
type MapBoxOptions = {
  ...Viewport;
  style: string;
  container: HTMLDivElement | string;
}

type FeatureProperty = {
  id?: string;
  ISO?: string;
  value?: number;
  type?: string
}

type PopupItem = {
  props: FeatureProperty;
  pos: {lng: number; lat: number};
}

class Map extends PureComponent {
  static getToken() {
    if (!process.env.accessToken) throw new Error('Provide a mapbox access token');
    const token = process.env.accessToken || 'put here to get rid of flow error warning';
    return token;
  }
  static tipTemplate(featureProperty: FeatureProperty) {
    return `<div class = "mapBox-popup"> ${featureProperty.toString()}</div>`;
  }
  constructor(props?: Props) {
    super(props);
    if (props && props.viewport) {
      const viewport = {...this.state.viewport, ...props.viewport};
      this.state = {...this.state, viewport};
    }
    if (props && props.mapStyle) this.state = {...this.state, mapStyle: props.mapStyle};
    mapboxgl.accessToken = this.state.token;
    this._isOnMobile = window.innerWidth < 1200;
  }
  state: State = {
    token: Map.getToken(),
    mapStyle: 'http://178.79.185.236:8080/styles/worldgeojson.json',
    viewport: this.viewport
  };
  viewport: Viewport = {
    zoom: 1,
    center: [25, 20],
    attributionControl: true,
    minZoom: 0.5,
    bearing: 0,
    bounds: [
      [-179, -61], // Southwest coordinates
      [188, 75]  // Northeast coordinates
    ],
    scrollZoom: false,
    width: process.browser ? window.innerWidth : 1200,
    height: process.browser && window.innerWidth < 1200 ? 480 : 600
  };
  _isOnMobile: boolean = false;
  _map: Object;
  _nav: Object;
  _popup: Object & {remove: any};
  _zoomLevel: number;

  addPopupContent(obj: PopupItem) {
    this._popup.setLngLat([obj.pos.lng, obj.pos.lat])
                .setHTML(Map.tipTemplate(obj.props))
                .addTo(this._map);
  }
  mouseHoverEvent() {
    this._map.on('mousemove', (e) => {
      // console.log('map bounds', e.lngLat);
      const features: {properties: any}[] = this._map.queryRenderedFeatures(e.point);
      // for some reason returns an array of the same event
      if (!features.length && this._popup) return this._popup.remove();
      if (!features.length) return false;
      if (features && !this._popup) this._popup = new mapboxgl.Popup({offset: 10});
      if (!features[0].properties) return this._popup.remove();
      return this.addPopupContent({props: features[0].properties, pos: e.lngLat});
    });
  }
  zoomListener() {
    this._map.on('zoomend', () => {
      this._zoomLevel = this._map.getZoom();
      return true;
    });
  }

  draw(domElement: HTMLDivElement) {
    const defaultOpts = {...this.state.viewport, style: this.state.mapStyle, container: domElement};
    const opts: MapBoxOptions = !this._isOnMobile ?
      {...defaultOpts, maxBounds: this.state.viewport.bounds} : defaultOpts;
    this._map = new mapboxgl.Map(opts);
    this._nav = new mapboxgl.NavigationControl();
    this._map.addControl(this._nav, 'top-right');
    this._map.dragRotate.disable();
    this._map.touchZoomRotate.disableRotation();
    this.zoomListener();
  }
  render() {
    const {viewport, mapStyle, token} = this.state;

    return (
      <section>
        {process.browser ?
        (<div key={'map-mapbox'} ref={(domElement) => this.draw(domElement)} />) :
        (<MapPlaceholder />)}
      </section>

    );
  }

}

export default Map;

