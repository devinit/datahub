// @flow
/* eslint-disable react/no-danger */
import React, {PureComponent} from 'react';
import mapboxgl from 'mapbox-gl';
import {lightGrey, red, seaBackground} from 'components/theme/semantic';
import stylesheet from 'mapbox-gl/dist/mapbox-gl.css';
import {MapContainer} from './styledMapContainer';

// TODO: possibly move types to separate file
export type Viewport = {
  zoom: number,
  center: number[],
  bounds: number[][],
  minZoom: number,
}
type ViewportDefaults = {
  attributionControl: boolean,
  scrollZoom: boolean
}
export type MapData = {| // TODO: consider getting this type from the schema flow type
  id: ?string,
  uid: ?string,
  year: ?number,
  name: ?string,
  color: ?string,
  value: ?number,
  detail: ?string
|}
export type PaintMap = {
  data: MapData[],
  center?: number[],
  mapStyle?: string,
  baseColor?: string,
  propertyName?: string,
  propertyLayer?: string,
  paintProperty?: string
}
export type Meta = {
  uom_display: ?string,
  // map indicator user friendly label / slug eg Poverty
  name: ?string
}

type Props = {
  paint: PaintMap,
  meta?: Meta,
  viewport?: Viewport,
  width?: number,
  height?: number,
  style?: Object
}
type State = {
  mapStyle: string,
  viewport: {...Viewport, ...ViewportDefaults}
}
type MapBoxOptions = {
  style: string,
  ...Viewport,
  ...ViewportDefaults,
  container: HTMLDivElement | string,
}
type FeatureProperty = {
  id?: string,
  ISO2?: string,
  value?: number,
  type?: string,
}
type Point = {
  lng: number,
  lat: number,
}
type PopupItem = {
  pointData: MapData,
  pos: Point,
}
type GenericTipHtml = {
  id: string;
  header: string;
  label: string;
  uom: string;
  value: string | number;
}
class BaseMap extends PureComponent {
  static genericTipHtml({id, header, label, value, uom}: GenericTipHtml) {
    return `<i  style="display: block;margin: 0 auto;width: 30%;"
                class="${id.toLocaleLowerCase()} flag"></i>
            <p style="text-align:center;font-weight: 700;line-height: 2; margin:0"> ${header} </p>
            <em> ${label}: <b> ${value}${uom}</b></em>`;
  }
  constructor(props: Props) {
    super(props);
    if (!props.viewport) throw new Error('viewport prop missing in basemap props');
    const viewport = {...this._viewportDefaults, ...props.viewport};
    this.state = {
      mapStyle: 'http://178.79.185.236:8080/styles/worldgeojson.json',
      viewport
    };
    if (props.paint.mapStyle) this.state = {...this.state, mapStyle: props.paint.mapStyle};
    this._isOnMobile = window.innerWidth < 1200;
  }

  state: State;

  _viewportDefaults: ViewportDefaults = {
    attributionControl: true,
    scrollZoom: false,
  };
  _mapLoaded: boolean = false;
  _isOnMobile: boolean = false;
  _map: Object;
  _nav: Object;
  _popup: Object & {remove: any};
  _center: Point;
  _zoomLevel: number;

  tipTemplate(pointData: MapData) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : 'Base map';
    const uom = this.props.meta && this.props.meta.uom_display ? this.props.meta.uom_display : '';
    if (!pointData.value) return `<div> ${JSON.stringify(pointData)} ${uom} ${name}</div>`; // possibly in debug
    if (!pointData.id || !pointData.value || !pointData.name) return false;
    const label = pointData.detail ? pointData.detail : name;
    const opts = {
      id: pointData.id,
      value: pointData.value,
      label,
      uom,
      header: pointData.name
    };
    return BaseMap.genericTipHtml(opts);
  }
  addPopupContent(obj: PopupItem) {
    this._popup.setLngLat([obj.pos.lng, obj.pos.lat])
                .setHTML(this.tipTemplate(obj.pointData))
                .addTo(this._map);
  }
  mouseHoverEvent() {
    this._map.on('mousemove', (e) => {
      const features: {properties: any}[] = this._map.queryRenderedFeatures(e.point);
      if (!features.length && this._popup) return this._popup.remove();
      if (!features.length) return false;
      const pointData: MapData | void = this.props.paint.data
        .find(obj => {
          const paintProperty = this.props.paint.paintProperty || 'ISO2';
          return obj.id === features[0].properties[paintProperty];
        });
      if (!pointData && this._popup) return this._popup.remove();
      if (!pointData) return false;
      if (pointData && !this._popup) this._popup = new mapboxgl.Popup({offset: 10});
      return this.addPopupContent({pointData, pos: e.lngLat});
    });
  }
  zoomListener() {
    this._map.on('zoomend', () => {
      this._zoomLevel = this._map.getZoom();
      // console.log('zoom level', this._zoomLevel);
      return true;
    });
  }
  dragListener() {
    this._map.on('dragend', () => {
      this._center = this._map.getCenter();
      // console.log('center', [this._center.lng, this._center.lat]);
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

  colorMap({data, baseColor, propertyName, propertyLayer}: PaintMap) {
    if (!data) throw new Error('you have to pass in data to color the map');
    // console.log('features: ', this._map.queryRenderedFeatures()[1]);
    const stops = data
      .filter(obj => obj.id && obj.color)
      .map((obj: MapData) => [obj.id, obj.color]);

    this._map.setPaintProperty(propertyLayer || 'national', 'fill-color',
      {
        property: propertyName || 'ISO2',
        type: 'categorical',
        default: baseColor || lightGrey,
        stops,
      });
  }
  draw(domElement: HTMLDivElement, paint: PaintMap) {
    const defaultOpts = {...this.state.viewport, style: this.state.mapStyle, container: domElement};
    const opts: MapBoxOptions = !this._isOnMobile ?
      {...defaultOpts, maxBounds: this.state.viewport.bounds} : defaultOpts;
    if (!this._map) this._map = new mapboxgl.Map(opts);
    if (!this._nav) {
      this._nav = new mapboxgl.NavigationControl();
      this._map.addControl(this._nav, 'top-right');
    }
    if (this._map && this._mapLoaded) this.colorMap(paint);
    this._map.on('load', () => {
      this._mapLoaded = true;
      this._map.setPaintProperty('background', 'background-color', seaBackground);
      this.colorMap(paint);
      this._map.dragRotate.disable();
      this._map.touchZoomRotate.disableRotation();
      this.zoomListener();
      this.mouseHoverEvent();
      this.dragListener();
      this.persistZoomAndCenterLevel();
      this.resize();
    });
  }
  render() {
    if (!process.browser) console.error('mapbox-gl only works in browsers and you dont seem to be in a browser enviroment');
    let {width, height, style} = this.props;
    if (!width) width = '100%';
    if (!height) height = window.innerWidth < 1000 ? 480 : 600;
    if (!style) style = {};
    if (!this.props.paint.data) throw new Error('please provide a paint property with the required mapData');
    const mapContainerStyle = {...style, width, height, position: 'relative'};
    return (
      <MapContainer>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div
          key={'map-mapbox'}
          ref={(domElement) => { if (domElement) this.draw(domElement, this.props.paint); }}
          style={mapContainerStyle}
        />
      </MapContainer>
    );
  }

}

export default BaseMap;

