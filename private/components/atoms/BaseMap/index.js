// @flow
/* eslint-disable react/no-danger */
import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {lightGrey, seaBackground, orange} from 'components/theme/semantic';
import Router from 'next/router';
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
export type MapData = {|
  id: ?string,
  slug: ?string,
  name: ?string,
  color: ?string,
  year: ?number,
  uid: ?string,
  detail: ?string,
  value: ?number,
|}

export type PaintMap = {
  data?: MapData[],
  center?: number[],
  mapStyle?: string, // we have a default style
  baseColor?: string,
  propertyName?: string,
  propertyLayer?: string,
  paintProperty?: string,
  slug?: string, // for only showing a single country
  background?: string
}
export type Meta = {
  uom_display: string,
  theme: string,
  country: string, // global or uganda for spotlight uganda
  id: string,
  // map indicator user friendly label / slug eg Poverty
  name: string
}

type Props = {
  paint: PaintMap,
  meta?: Meta,
  viewport?: Viewport,
  countryProfile?: string,
  width?: number | string,
  height?: number | string
}

type MapBoxOptions = {
  style: string,
  ...Viewport,
  ...ViewportDefaults,
  container: HTMLDivElement | string,
}
type Feature = {
  properties: {
    id?: string,
    ISO2?: string,
    value?: number,
    type?: string,
    ISO?: string,
    P20?: number,
    p20?: number,
    DHSREGEN ?: string,
    CNTRYNAMEE?: string,
    NAME?: string,
    dhsreg?: string
  }
}
type Geometry = {
  coordinates: number[][]
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
  static foldOverSurveyMapFeatures(features: Feature[]): MapData {
    const props = features.reverse().reduce((acc, feature) => {
       // this is a country feature;
      const p20: number = feature.properties && feature.properties.p20 ? feature.properties.p20 : 0;
      if (p20 === 0) return {...acc, ...feature.properties};
      const sum = acc.sum + p20;
      const total = acc.total + 1;
      return {...acc, sum, total, ...feature.properties};
    }, { total: 0, sum: 0});
    // console.log('props', props, features);
    const value: number = props.total ? Math.round((props.sum / props.total) * 100) : 0;
    const id: string = props.ISO2 || '';
    const countryName: string = props.NAME || props.NAME || '';
    const region: string = props.dhsreg ? props.dhsreg : '';
    const name = region ? `Region: ${region} ,  ${countryName}` : countryName;
    return {value, id, name, detail: '', uid: '', year: 2013, color: '', slug: ''};
  }
  static pointDataForPreStyledMap(features: Feature[], indicator: string): MapData {
    if (indicator === 'survey_p20') return BaseMap.foldOverSurveyMapFeatures(features);
    if (!features[0].properties) throw new Error('Properties missing from map style');
    const properties = features[0].properties;
    const value: number = properties.P20 ? Math.round(properties.P20 * 100) : 0;
    const countryName: string = properties.CNTRYNAMEE || '';
    const id: string = properties.ISO || '';
    const region: string = properties.DHSREGEN ? properties.DHSREGEN : '';
    const name = region ? `Region: ${region} ,  ${countryName}` : countryName;
    return { value, id, name, detail: '', uid: '', year: 2013, color: '', slug: ''};
  }
  static tipToolTipValueStr(value: string | number, uom: string) {
    switch (uom) {
      case '%':
        return `${value}${uom}`;
      case 'US$':
        return `${uom}:${value}`;
      default:
        return value;
    }
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

  genericTipHtml({id, country, name, value, uom}: GenericTipHtml) {
    const valueStr = BaseMap.tipToolTipValueStr(value, uom);
    const flagUrl: string = this.props.meta && this.props.meta.country === 'global' ? `/flags/svg/${id}.svg` : '';
    const upperTip = `<p style="text-align:center;line-height: 1; margin:0">
              <img  style="max-width: 20px;max-height: 15px;" src="${flagUrl}">
            </p>
            <p style="text-align:center;line-height: 2; margin:0; font-size: 1.2em"> ${country} </p>`;
    const lowerTip = name && name.length ?
      `<em>${name}:<span style="font-size: 1em; font-weight: 700; color:${orange}"> ${valueStr}</span></em>` : '';
    return `${upperTip}${lowerTip}`;
  }
  tipTemplate(pointData: MapData) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : '';
    if (!pointData.id || !pointData.name || !pointData.id.length || !pointData.name.length) {
      return false;
    }
    const country: string = pointData.name;
    const id: string = pointData.id;
    let value: string = '';
    // TODO: find away of indicating what tooltip should be from concept.csv
    if (!isNaN(Number(pointData.value))) value = approximate(pointData.value);
    const theme = this.props.meta && this.props.meta.theme ? this.props.meta.theme : '';
    if (this.props.countryProfile) value = '';
    if (theme === 'data-revolution' && pointData.detail) value = pointData.detail;
    if (theme === 'government-finance' && pointData.detail) value = `${value}-[${pointData.detail}]`;
    if (this.props.meta && this.props.meta.id === 'data_series.fragile_states' && pointData.detail) value = pointData.detail;
    if (value === undefined || value === null) console.error('value for tip template is empty');
    const uom: string = this.props.meta && this.props.meta.uom_display ? this.props.meta.uom_display : '';
    const opts = {id, value, name, uom, country};
    return this.genericTipHtml(opts);
  }
  addPopupContent(obj: PopupItem) {
    this._popup.setLngLat([obj.pos.lng, obj.pos.lat])
                .setHTML(this.tipTemplate(obj.pointData))
                .addTo(this._map);
  }

  mouseHoverEvent() {
    this._map.on('mousemove', (e) => {
      const features: Feature[] = this._map.queryRenderedFeatures(e.point);
      if (!features.length && this._popup) return this._popup.remove();
      if (!features.length) return false;
      let pointData: MapData | void;
      if (this.props.paint.data && this.props.paint.data.length) {
        // for regular global picture and spotlight map & the small profile maps
        pointData = this.props.paint.data
          .find(obj => {
            const paintProperty: string = this.props.paint.propertyName || 'ISO2';
            return obj.id === features[0].properties[paintProperty];
          });
      } else {
        // TODO: add point data from features contact alex
        // for pre-styled maps i.e survey & regional map
        if (features.length < 2 && this._popup) return this._popup.remove();
        if (features.length < 2) return false;
        if (this.props.meta && this.props.meta.id) {
          pointData = BaseMap.pointDataForPreStyledMap(features, this.props.meta.id);
        }
      }
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
  mouseMapClick(paint: PaintMap) {
    this._map.on('click', (event) => {
      if (!this.props.meta || this.props.meta.id === 'survey_p20' || this.props.meta.id === 'regional_p20') return false;
      const features: Feature = this._map.queryRenderedFeatures(event.point);
      if (!features.length) return false;
      const property = paint.paintProperty || 'ISO2';
      const countryId: string = features[0].properties[property];
      // console.log('feature: ', features[0]);
      if (!paint.data) return false;
      const point: MapData | void = paint.data.find(obj => {
        if (!obj.id) return false;
        return obj.id === countryId;
      });
      if (!point || !point.slug) return false;
      return Router.push(`/country?id=${point.slug}`, `/country/${point.slug}`);
    });
  }
  colorMap({data, baseColor, propertyName, propertyLayer}: PaintMap) {
    if (!data || !data.length) throw new Error('you have to pass in data to color the map');
    const stops = data
      .filter(obj => obj.id && obj.color)
      .map((obj: MapData) => [obj.id, obj.color]);
    const features = this._map.queryRenderedFeatures({layers: ['national']});
    console.log('30', features[30].geometry.coordinates);
    console.log('40', features[40].geometry.coordinates);
    this._map.setPaintProperty(propertyLayer || 'national', 'fill-color',
      {
        property: propertyName || 'ISO2',
        type: 'categorical',
        default: baseColor || lightGrey,
        stops,
      });
  }
  zoomToGeometry(geometry: Geometry) {
    let bounds: number[][];
    if (geometry.type === 'Polygon') {
      const coordinates: number[] = geometry.coordinates[0];
      console.log('polygon', coordinates);
      bounds = coordinates.reduce((bounds: number[][], coord) => {
        return bounds.concat([coord]);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    }
    console.log(bounds);
    if (geometry.type === 'MultiPolygon') {
      const sets = geometry.coordinates[0];
      console.log('multipolygon', sets);
      // bounds = sets.map((coordinates: number[]) => {
      //   return coordinates[0].reduce((bounds, coord) => {
      //     return bounds.concat([coord]);
      //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      // });
    }
    this._map.fitBounds(bounds, {
      padding: 20
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
    if (this._map && this._mapLoaded && paint.data && paint.data.length) this.colorMap(paint);
    if (!this.map && !this._mapLoaded) {
      this._map.on('load', () => {
        this._mapLoaded = true;
        this._map.setPaintProperty('background', 'background-color', paint.background || seaBackground);
        if (paint.data && paint.data.length) this.colorMap(paint);
        this._map.dragRotate.disable();
        this._map.touchZoomRotate.disableRotation();
        this.zoomListener();
        if (this.props.meta || paint.data) this.mouseHoverEvent(); // TODO turn into a this.meta.
        this.mouseMapClick(paint);
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
    return (
      <MapContainer>
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

