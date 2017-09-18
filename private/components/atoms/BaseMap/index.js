// @flow
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { lightGrey, seaBackground, orange, red } from 'components/theme/semantic';
import type {Route} from 'lib/utils';
import {approximate, countryOrDistrictLink} from 'lib/utils';
import LoadingBar from 'components/molecules/LoadingBar';
import Router from 'next/router';
import { MapContainer } from './styledMapContainer';
import type {
  Feature,
  MapData,
  PaintMap,
  Props,
  Point,
  PopupItem,
  State,
  MapBoxOptions,
  ViewportDefaults,
  Geometry,
  GenericTipHtml,
  Meta,
} from './types';

const NO_DATA = 'No data';

export const indicatorsWith0dp = [
  'data_series.natural_hazard',
  'spotlight_on_uganda.uganda_urban_pop',
  'spotlight_on_uganda.uganda_rural_safe_water',
  'spotlight_on_uganda.uganda_rural_water_func',
  'spotlight_on_uganda.uganda_water_source_comm_func',
  'spotlight_on_uganda.uganda_wash_perf_score',
  'data_series.number_of_un_appeals',
  'spotlight_on_uganda.uganda_health_posts',
  'data_series.forgotten_crisis'];

class BaseMap extends Component {
  static foldOverSurveyMapFeatures(features: Feature[]): MapData {
    const props = features.reverse().reduce((acc, feature) => {
      // this is a country feature;
      const p20: number = feature.properties && feature.properties.p20 ? feature.properties.p20 : 0;
      if (p20 === 0) return { ...acc, ...feature.properties };
      const sum = acc.sum + p20;
      const total = acc.total + 1;
      return { ...acc, sum, total, ...feature.properties };
    }, { total: 0, sum: 0 });

    const value: number = props.total ? Math.round((props.sum / props.total) * 100) : 0;
    const id: string = props.ISO2 || '';
    const countryName: string = props.NAME || '';
    const region: string = props.DHSREGNA || '';
    const name = region ? `Region: ${region} ,  ${countryName}` : countryName;
    return { value, id, name, detail: '', uid: '', year: 2013, color: '', slug: '' };
  }
  static pointDataForPreStyledMap(features: Feature[], indicator: string): MapData | null {
    if (indicator === 'survey_p20') return BaseMap.foldOverSurveyMapFeatures(features);
    if (!features[0].properties) throw new Error('Properties missing from map style');
    if (features[0].layer.type === 'line') return null;
    const properties = features[0].properties;
    const value: number = properties.P20 ? Math.round(properties.P20 * 100) : 0;
    const countryName: string = properties['country-name'] || '';
    const slug: string = properties['country-slug'] || '';
    const id: string = properties.ISO || '';
    const region: string = properties.DHSREGEN ? properties.DHSREGEN : '';
    const name = region ? `Region: ${region} ,  ${countryName}` : countryName;
    return { value, id, name, detail: '', uid: '', year: 2013, color: '', slug};
  }
  static setPointDataValue(
    value: number, uom?: string, indicator?: string): string {
    if (indicator === 'survey_p20' || indicator === 'regional_p20') return value.toString();
    if (indicatorsWith0dp.includes(indicator)) return value.toFixed(0);
    if (uom === '%' && indicator && indicator.includes('uganda')) return value.toFixed(1);
    if (uom === '%') return value.toFixed(2);
    return approximate(value);
  }
  static tipToolTipValueStr(value: string | number, uom: string) {
    switch (uom) {
      case '%':
        return `${value}${uom}`;
      default:
        return value;
    }
  }
  constructor(props: Props) {
    super(props);
    if (!props.viewport) throw new Error('viewport prop missing in basemap props');
    if (!props.paint) throw new Error('viewport prop missing in basemap props');
    this._isOnMobile = window.innerWidth < 1200;
    this.state = {
      profileLoading: false,
      shouldForceRedraw: false
    };
  }
  state: State;
  /* eslint-disable react/sort-comp */
  _viewportDefaults: ViewportDefaults = {
    attributionControl: true,
    scrollZoom: false,
  };
  _propertyName: string = 'ISO2';
  _mapLoaded: boolean = false;
  _isOnMobile: boolean = false;
  _map: Object;
  _nav: Object;
  _popup: Object & { remove: any };
  _center: Point;
  _zoomLevel: number;
  _element: HTMLDivElement;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.paint.mapStyle !== this.props.paint.mapStyle) {
      this.setState({shouldForceRedraw: true});
    }
  }
  genericTipHtml({ id, country, name, value, uom, year }: GenericTipHtml) {
    const valueStr = value === NO_DATA ? NO_DATA : BaseMap.tipToolTipValueStr(value, uom);
    const valueWithYear = year ?
      `${valueStr}<span style="color: white;font-weight: 500;"> in ${year}</span>` : valueStr;
    const flagUrl: string =
      this.props.meta && this.props.meta.country === 'global' ? `/flags/svg/${id}.svg` : '';
    const upperTip = `<p style="text-align:center;line-height: 1; margin:0">
              <img  style="max-width: 20px;max-height: 15px;" src="${flagUrl}">
            </p>
            <p style="text-align:center;line-height: 2; margin:0; font-size: 1.2em"> ${country} </p>`;
    const lowerTip =
      name && name.length
        ? `<em>${name}:<span style="font-size: 1em; font-weight: 700; color:${orange}"> ${valueWithYear}</span></em>`
        : '';
    return `${upperTip}${lowerTip}`;
  }
  tipTemplate(pointData: MapData) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : '';
    if (!pointData.id || !pointData.name || !pointData.id.length || !pointData.name.length) {
      return false;
    }
    const country: string = pointData.name;
    const id: string = pointData.id;
    const theme: string = this.props.meta && this.props.meta.theme ? this.props.meta.theme : '';
    const indicator: string = this.props.meta && this.props.meta.id ? this.props.meta.id : '';
    const detail: string = pointData.detail || NO_DATA;
    let uom: string =
      this.props.meta && this.props.meta.uom_display ? this.props.meta.uom_display : '';
    let value: string = NO_DATA;
    if (pointData.value !== null && pointData.value !== undefined &&
      this.props.meta && this.props.meta.id) {
      value = BaseMap.setPointDataValue(pointData.value, uom, this.props.meta.id);
    }
    if (pointData.value === null) value = NO_DATA;
    if (this.props.countryProfile) value = '';
    if (theme === 'data-revolution' || indicator === 'data_series.fragile_states'
      || indicator === 'data_series.largest_intl_flow') {
      value = detail;
    }
    if (theme === 'government-finance' && pointData.detail) {
      value = `${value} <span style="color: white; font-weight: 400;">[ ${pointData.detail} ]</span>`;
    }
    if (theme === 'government-finance' && pointData.detail && uom === '%') uom = '';
    const opts = { id, value, name, uom, country, year: pointData.year || 0 };
    if (!id) return false;
    return this.genericTipHtml(opts);
  }
  addPopupContent(obj: PopupItem) {
    this._popup
      .setLngLat([obj.pos.lng, obj.pos.lat])
      .setHTML(this.tipTemplate(obj.pointData))
      .addTo(this._map);
  }
  setMinimalMapDataPoint(feature: Feature, value: null | number): MapData {
    const id = feature.properties[this.props.paint.propertyName || this._propertyName];
    const nameProperty = this.props.paint.propertyLayer === 'national' ? 'country-name' : 'name';
    const slugProperty = this.props.paint.propertyLayer === 'national' ? 'country-slug' : 'name';
    return {
      id,
      slug: feature.properties[slugProperty],
      name: feature.properties[nameProperty],
      year: 0,
      value,
      uid: '',
      detail: '',
      color: '',
    };
  }
  getMouseHoverPointData(features: Feature[]): MapData | null {
    if (this.props.paint.data && this.props.paint.data.length) {
      // for regular global picture and spotlight map & the small profile maps
      const point: MapData | void = this.props.paint.data.find(obj => {
        const paintProperty: string = this.props.paint.propertyName || this._propertyName;
        return obj.id === features[0].properties[paintProperty];
      });
      return point || this.setMinimalMapDataPoint(features[0], null);
    }
    if (this.props.countryProfile) return this.setMinimalMapDataPoint(features[0], 0);
    if (!this.props.countryProfile && features.length > 1 && this.props.meta) {
      // for pre-styled maps i.e survey & regional map
      if (this.props.meta.id) return BaseMap.pointDataForPreStyledMap(features, this.props.meta.id);
      return this.setMinimalMapDataPoint(features[0], null);
    }
    return this.setMinimalMapDataPoint(features[0], null);
  }
  mouseHoverEvent() {
    this._map.on('mousemove', e => {
      const features: Feature[] = this._map.queryRenderedFeatures(e.point);
      if (!features.length && this._popup) return this._popup.remove();
      if (!features.length) return false;
      const pointData: MapData | null = this.getMouseHoverPointData(features);
      if (!pointData && this._popup) return this._popup.remove();
      if (!pointData) return false;
      if (pointData && !this._popup) this._popup = new mapboxgl.Popup({ offset: 5 });
      return this.addPopupContent({ pointData, pos: e.lngLat });
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
    this._map.on('data', e => {
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
  mouseMapClick(meta: Meta) {
    this._map.on('click', event => {
      if (meta.id === 'survey_p20' || meta.id === 'regional_p20') return false;
      const features: Feature = this._map.queryRenderedFeatures(event.point);
      if (!features.length) return false;
      const slugProperty = this.props.paint.propertyLayer === 'national' ? 'country-slug' : 'name';
      const slug: string | void = features[0].properties[slugProperty];
      if (!slug) return false;
      if (!this.props.meta || !this.props.meta.country) return false;
      const route: Route = countryOrDistrictLink(this.props.meta.country, slug.toLowerCase());
      this.setState({ profileLoading: true });
      return Router.push(route.routePath, route.routeAsPath);
    });
  }
  setMapPaintProperty(stops: string[][], propertyLayer?: string, propertyName?: string) {
    this._map.setPaintProperty(propertyLayer || 'national', 'fill-color', {
      property: propertyName || this._propertyName,
      type: 'categorical',
      default: lightGrey,
      stops,
    });
  }
  colorMap({ data, propertyName, propertyLayer }: PaintMap) {
    if (!data || !data.length) throw new Error('you have to pass in data to color the map');
    const stops = data.filter(obj => obj.id && obj.color).map((obj: MapData) => {
      if (!obj.id || !obj.color) throw new Error('color and id values missing');
      return [obj.id, obj.color];
    });
    this.setMapPaintProperty(stops, propertyLayer, propertyName);
  }
  getRegionFeature(slug: string, propertyLayer?: string): Feature | void {
    const layer = propertyLayer || 'national';
    const slugProperty = layer === 'national' ? 'country-slug' : 'name';
    const features: Feature[] = this._map.queryRenderedFeatures({ layers: [layer] });
    const feature: Feature | void = features.find(feature => {
      if (feature.properties[slugProperty] && slugProperty === 'name') {
        return feature.properties[slugProperty].toLowerCase() === slug;
      }
      return feature.properties[slugProperty] === slug;
    });
    return feature;
  }
  zoomToGeometry(geometry: Geometry) {
    let bounds: any;
    if (geometry.type === 'Polygon') {
      const coordinates: number[][] = geometry.coordinates[0];
      bounds = coordinates.reduce((bounds: any, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    }
    if (geometry.type === 'MultiPolygon') {
      const sets: number[][][] = geometry.coordinates;
      bounds = sets.reduce((bounds: any, set) => {
        const coordinates: number[] = set[0];
        const innerBounds = coordinates.reduce((inner: any, coord) => {
          return inner.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        return bounds.extend(innerBounds);
      }, new mapboxgl.LngLatBounds(sets[0][0][0], sets[0][0][0]));
    }
    if (!bounds) return false;
    const dx = (bounds._ne.lat - bounds._sw.lat);
    const dy = (bounds._ne.lng - bounds._sw.lng);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const maxZoom = distance > 30 || this.props.countryProfile === 'usa' ? 1.3 : 3.5;
    console.log(distance, maxZoom, bounds);
    return this._map.fitBounds(bounds, {
      padding: 0,
      offset: this.props.paint.propertyLayer === 'national' ? [200, 0] : [400, 0],
      maxZoom: this.props.paint.propertyLayer === 'national' ? maxZoom : 5.5,
    });
  }
  focusOnCountryOrDistrict(slug: string, paint: PaintMap) {
    const feature = this.getRegionFeature(slug, paint.propertyLayer);
    if (feature) {
      this.zoomToGeometry(feature.geometry);
      const propertyId: string = feature.properties[paint.propertyName || this._propertyName] || '';
      if (propertyId.length) {
        const stop = [propertyId, red];
        this.setMapPaintProperty([stop], paint.propertyLayer, paint.propertyName);
      }
    }
  }

  draw(domElement: HTMLDivElement, paint: PaintMap) {
    const viewport = { ...this._viewportDefaults, ...this.props.viewport };
    const mapStyle = this.props.paint.mapStyle || '/styles/worldgeojson.json';
    const defaultOpts = { ...viewport, style: mapStyle, container: domElement };
    const opts: MapBoxOptions = !this._isOnMobile && !this.props.countryProfile
      ? { ...defaultOpts, maxBounds: viewport.bounds }
      : defaultOpts;
    // draw map
    if (!this._map || this.state.shouldForceRedraw) {
      if (this._map) this._map.remove();
      this._mapLoaded = false; // feels abit dirty
      this._map = new mapboxgl.Map(opts);
    }
    if (!this._nav || !this._mapLoaded) this.addMapNav();
    // React creates a new class instance per render which gets memoized
    if (this._map && this._mapLoaded && paint.data && paint.data.length) this.colorMap(paint);

    if (this.props.countryProfile && this._map && this._mapLoaded) {
      this.focusOnCountryOrDistrict(this.props.countryProfile, paint);
    }

    if (!this._mapLoaded) this.onMapLoad(paint);
  }
  addMapNav = () => {
    this._nav = new mapboxgl.NavigationControl();
    this._map.addControl(this._nav, 'top-right');
  }
  onMapLoad = (paint: PaintMap) => {
    this._map.on('load', () => {
      this._mapLoaded = true;
      this._map.setPaintProperty(
        'background',
        'background-color',
        paint.background || seaBackground,
      );
      if (paint.data && paint.data.length) this.colorMap(paint);
      if (this.props.countryProfile) {
        this.focusOnCountryOrDistrict(this.props.countryProfile, paint);
      }
      this._map.dragRotate.disable();
      this._map.touchZoomRotate.disableRotation();
      if (!this.props.countryProfile) this.zoomListener();
      if (this.props.meta) this.mouseHoverEvent(); // TODO turn into a this.meta.
      if (this.props.meta) this.mouseMapClick(this.props.meta);
      if (!this.props.countryProfile) this.dragListener();
      if (!this.props.countryProfile) this.persistZoomAndCenterLevel();
      this.resize();
    });
  }
  render() {
    let { width, height } = this.props;
    if (!width) width = '100%';
    if (!height) height = window.innerWidth < 1000 ? 480 : 600;
    const mapContainerStyle = { width, height, position: 'relative' };
    return (
      <MapContainer>
        <LoadingBar loading={this.state.profileLoading} />
        <div
          key={'map-mapbox'}
          ref={element => {
            if (element) this.draw(element, this.props.paint);
          }}
          style={mapContainerStyle}
        />
      </MapContainer>
    );
  }
}

export default BaseMap;
