// @flow
import React, {PureComponent} from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {lightGrey, red} from 'components/theme/semantic';
import {MapPlaceholder} from '../Container';

type Viewport = {
  zoom: number;
  center: number[];
  attributionControl: boolean;
  bounds: number[][];
  minZoom: number;
  scrollZoom: boolean;
}
type MapData = {
  id?: string,
  name?: string,
  color?: string,
  value?: number,
}

type PaintMap = {
  data: MapData[];
  baseColor?: string;
  propertyName?: string;
  propertyLayer?: string;
  type?: string;
}

type Props = {
  paint: PaintMap;
  mapStyle?: string;
  viewport?: Viewport;
  width?: number;
  height?: number;
  style?: Object;
}

type State = {
  // token: string;
  mapStyle: string;
  viewport: Viewport
}
type MapBoxOptions = Viewport & {
  style: string;
  container: HTMLDivElement | string;
}

type FeatureProperty = {
  id?: string;
  ISO?: string;
  value?: number;
  type?: string
}
type Point = {
  lng: number;
  lat: number;
}
type PopupItem = {
  props: FeatureProperty;
  pos: Point;
}

class Map extends PureComponent {
  static getToken() {
    if (!process.env.MapboxAccessToken) console.error('Provide a mapbox access token');
    const token = process.env.MapboxAccessToken || 'put here to get rid of flow error warning';
    return token;
  }
  static tipTemplate(featureProperty: FeatureProperty) {
    return `<div class = "mapBox-popup"> ${featureProperty.toString()}</div>`;
  }
  constructor(props?: Props) {
    super(props);
    this.state = {
      token: Map.getToken(), // for when we use mapbox
      mapStyle: 'http://178.79.185.236:8080/styles/worldgeojson.json',
      viewport: this.viewport
    };
    if (props && props.viewport) {
      const viewport = {...this.state.viewport, ...props.viewport};
      this.state = {...this.state, viewport};
    }
    if (props && props.mapStyle) this.state = {...this.state, mapStyle: props.mapStyle};
    mapboxgl.accessToken = this.state.token;
    this._isOnMobile = window.innerWidth < 1200;
  }

  state: State;

  viewport: Viewport = {
    zoom: 1,
    center: [25, 20],
    attributionControl: true,
    minZoom: 1,
    bounds: [
      [-179, -61], // Southwest coordinates
      [188, 75]  // Northeast coordinates
    ],
    scrollZoom: false,
  };
  _isOnMobile: boolean = false;
  _map: Object;
  _nav: Object;
  _popup: Object & {remove: any};
  _center: Point;
  _zoomLevel: number;

  addPopupContent(obj: PopupItem) {
    this._popup.setLngLat([obj.pos.lng, obj.pos.lat])
                .setHTML(Map.tipTemplate(obj.props))
                .addTo(this._map);
  }
  mouseHoverEvent() {
    this._map.on('mousemove', (e) => {
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
  dragListener() {
    this._map.on('dragend', () => {
      this._center = this._map.getCenter();
      return true;
    });
  }
  // Persists zoom and center on style change
  persistZoomAndCenterLevel() {
    this._map.on('data', (e) => {
      if (e.dataType === 'style') {
        if (this._zoomLevel) this._map.setZoom(this._zoomLevel);
        if (this._center) this._map.setCenter([this._center.lng, this._center.lat]);
      }
    });
  }
  resize() {
    window.addEventListener('resize', () => {
      this._map.resize();
    });
  }

  colorMap({data, baseColor, propertyName, propertyLayer, type}: PaintMap) {
    if (!data) throw new Error('you have to pass in data to color the map');
    const stops = data
      .filter(obj => obj.id && obj.color)
      .map((obj: MapData) => [obj.id, obj.color]);

    this._map.setPaintProperty(propertyLayer || 'national', 'fill-color',
      {
        property: 'ISO2',
        type: 'categorical',
        default: lightGrey,
        stops,
      });
  }
  draw(domElement: HTMLDivElement, paint: PaintMap) {
    const defaultOpts = {...this.state.viewport, style: this.state.mapStyle, container: domElement};
    const opts: MapBoxOptions = !this._isOnMobile ?
      {...defaultOpts, maxBounds: this.state.viewport.bounds} : defaultOpts;
    this._map = new mapboxgl.Map(opts);
    this._nav = new mapboxgl.NavigationControl();
    this._map.addControl(this._nav, 'top-right');
    this._map.on('load', () => {
      this._map.setPaintProperty('background', 'background-color', '#d3e0f4 ');
      this.colorMap(paint);
      this._map.dragRotate.disable();
      this._map.touchZoomRotate.disableRotation();
      this.zoomListener();
      this.dragListener();
      this.persistZoomAndCenterLevel();
      this.resize();
    });
  }
  render() {
    let {width, height, style} = this.props;
    if (!width) width = '100%';
    if (!height) height = window.innerWidth < 1000 ? 480 : 600;
    if (!style) style = {};
    if (!this.props.paint.data) throw new Error('please provide a paint property with the required mapData');
    const mapContainerStyle = {...style, width, height, position: 'relative'};
    return (
      <section>
        {process.browser ?
        (<div
          key={'map-mapbox'}
          ref={(domElement) => { if (domElement) this.draw(domElement, this.props.paint); }}
          style={mapContainerStyle}
        />) :
        (<MapPlaceholder />)}
      </section>
    );
  }

}

export default Map;

