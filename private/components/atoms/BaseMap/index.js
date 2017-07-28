// @flow
/* eslint-disable react/no-danger */
import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {lightGrey, red, seaBackground, lightOrange} from 'components/theme/semantic';
import stylesheet from 'mapbox-gl/dist/mapbox-gl.css';
import approximate from 'approximate-number';
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
  uom_display: string,
  theme: string,
  // map indicator user friendly label / slug eg Poverty
  name: string
}

type Props = {
  paint: PaintMap,
  meta?: Meta,
  viewport?: Viewport,
  width?: number,
  height?: number,
  style?: Object
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
  country: string;
  name: string;
  uom: string;
  value: string | number;
}
class BaseMap extends Component {
  static genericTipHtml({id, country, name, value, uom}: GenericTipHtml) {
    return `<p style="text-align:center;line-height: 1; margin:0">
              <img  style="max-width: 20px;max-height: 15px;" src="/flags/svg/${id}.svg">
            </p>
            <p style="text-align:center;line-height: 2; margin:0; font-size: 1.2em"> ${country} </p>
            <em>${name}:<span style="font-size: 1.2em; color:${lightOrange}"> ${value}${uom}</span></em>`;
  }
  constructor(props: Props) {
    super(props);
    if (!props.viewport) throw new Error('viewport prop missing in basemap props');
    this._viewport = {...this._viewportDefaults, ...props.viewport};
    this._mapStyle = props.paint.mapStyle || '/styles/worldgeojson.json';
    this._isOnMobile = window.innerWidth < 1200;
  }
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
  _element: HTMLDivElement;
  _viewport: Viewport;
  _mapStyle: string;

  tipTemplate(pointData: MapData) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : 'Base map';
    const uom = this.props.meta && this.props.meta.uom_display === '%' ? '%' : '';
    if (!pointData.id || pointData.value === undefined || !pointData.name) return false;
    let value = pointData.detail ? pointData.detail : approximate(pointData.value);
    const theme = this.props.meta && this.props.meta.theme ? this.props.meta.theme : 'default';
    if (theme === 'data-revolution' && pointData.year) value = pointData.year.toString();
    const opts = {
      id: pointData.id,
      value,
      name,
      uom,
      country: pointData.name
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
  colorMap({data, baseColor, propertyName, propertyLayer}: PaintMap) {
    if (!data) throw new Error('you have to pass in data to color the map');
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
    const defaultOpts = {...this._viewport, style: this._mapStyle, container: domElement};
    const opts: MapBoxOptions = !this._isOnMobile ?
      {...defaultOpts, maxBounds: this._viewport.bounds} : defaultOpts;
    if (!this._map) this._map = new mapboxgl.Map(opts);
    if (!this._nav) {
      this._nav = new mapboxgl.NavigationControl();
      this._map.addControl(this._nav, 'top-right');
    }
    // React creates a new class instance per render
    // and it recalls them i.e they continue existing
    if (this._map && this._mapLoaded) this.colorMap(paint);
    if (!this.map && !this._mapLoaded) {
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
  }
  render() {
    let {width, height} = this.props;
    if (!width) width = '100%';
    if (!height) height = window.innerWidth < 1000 ? 480 : 600;
    const mapContainerStyle = {width, height, position: 'relative'};
    if (!this.props.paint.data) throw new Error('please provide a paint property with the required map data');
    return (
      <MapContainer>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div
          key={'map-mapbox'}
          ref={element => { if (element) this.draw(element, this.props.paint); }}
          style={mapContainerStyle}
        />
      </MapContainer>
    );
  }

}

export default BaseMap;

