import { approximate } from '@devinit/prelude/lib/numbers';
import { SingletonRouter } from 'next/router';
import * as React from 'react';
import { Route, Router, countryOrDistrictLink, router } from '../../../utils';
import LoadingBar from '../../molecules/LoadingBar';
import globalData from '../../molecules/SearchInput/global';
import { lightGrey, orange, red, seaBackground } from '../../theme/semantic';
import { MapContainer } from './styledMapContainer';
import {
  Feature,
  GenericTipHtml,
  Geometry,
  MapBoxOptions,
  Meta,
  PaintMap,
  Point,
  PopupItem,
  PropertyLayerSlugMap,
  Viewport,
  ViewportDefaults
} from './types';

// TODO: this is a hack
const mapboxgl = (process as any).browser ? require('mapbox-gl') : {}; // tslint:disable-line no-var-requires

const NODATA = 'No data';

export interface Props {
  paint: PaintMap;
  viewport: Viewport;
  router?: SingletonRouter;
  meta?: Meta;
  countryProfile?: string;
  width?: number | string;
  height?: number | string;
}

export interface State {
  profileLoading: boolean; // think loading new country on map click
  shouldForceRedraw: boolean;
}
export const indicatorsWith2dp = [ 'fact.oda_to_ldcs_percent_gni', 'fact.oda_percent_gni' ];

export const indicatorsWith0dp = [
  'spotlightonuganda.ugandaurbanpop',
  'spotlightonuganda.ugandaruralsafewater',
  'spotlightonuganda.ugandaruralwaterfunc',
  'spotlightonuganda.ugandawatersourcecommfunc',
  'spotlightonuganda.ugandawashperfscore',
  'dataseries.numberofunappeals',
  'spotlightonuganda.ugandahealthposts',
  'dataseries.forgottencrisis'
];

class BaseMap extends React.Component<Props, State> {
  viewportDefaults: ViewportDefaults = {
    attributionControl: true,
    scrollZoom: false
  };
  propertyName = 'ISO2';
  mapLoaded = false;
  isOnMobile = window.innerWidth < 1200;
  map: any;
  nav: any;
  popup: { remove: any, setLngLat: (args: any[]) => any; } & any;
  center: Point;
  zoomLevel: number;
  element: HTMLDivElement;
  propertyLayerSlugMap: PropertyLayerSlugMap = {
    national: 'country-slug',
    uganda: 'name',
    kenya: 'NAME_2'
  };
  propertyLayerNameMap: PropertyLayerSlugMap = {
    ...this.propertyLayerSlugMap,
    national: 'country-name'
  };
  router: Router = this.props.router ? this.props.router : router;
  private mapNode?: HTMLDivElement;

  constructor(props: Props) {
    super(props);

    if (!props.viewport) {
      throw new Error('viewport prop missing in basemap props');
    }
    if (!props.paint) {
      throw new Error('paint prop missing in basemap props');
    }
    this.state = {
      profileLoading: false,
      shouldForceRedraw: false
    };
    this.getMapNode = this.getMapNode.bind(this);
  }

  render() {
    let { width, height } = this.props;
    if (!width) { width = '100%'; }
    if (!height) { height = window.innerWidth < 1000 ? 480 : 600; }

    return (
      <MapContainer>
        <LoadingBar loading={ this.state.profileLoading } />
        <div
          style={ { width, height, position: 'relative' } }
          ref={ this.getMapNode }
        />
      </MapContainer>
    );
  }

  componentDidMount() {
    if (this.mapNode) {
      this.draw(this.mapNode, this.props);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const mapStyleUpdated = nextProps.paint.mapStyle !== this.props.paint.mapStyle;
    const countryProfileUpdated = this.props.countryProfile !== nextProps.countryProfile;
    if ((mapStyleUpdated || countryProfileUpdated) && this.mapNode) {
      this.draw(this.mapNode, nextProps);
    } else if (this.map && this.mapLoaded && nextProps.paint.data && nextProps.paint.data.length) {
      this.colorMap(nextProps.paint);
    }
  }

  private getMapNode(mapNode: HTMLDivElement | null) {
    if (mapNode) {
      this.mapNode = mapNode;
    }
  }

  private draw(mapElement: HTMLDivElement, props: Props) {
    const mapOptions: MapBoxOptions = this.getMapOptions(mapElement, props);
    if (this.map) {
      this.map.remove();
      this.nav = undefined;
    }
    this.mapLoaded = false; // feels abit dirty
    this.map = new mapboxgl.Map(mapOptions);
    if (!this.nav) { this.addMapNav(); }
    this.onMapLoad(props);
  }

  private getMapOptions(container: HTMLDivElement, props: Props): MapBoxOptions {
    const viewport = { ...this.viewportDefaults, ...props.viewport };
    const mapStyle = props.paint.mapStyle || '/styles/worldgeojson.json';
    const defaultOptions = { ...viewport, container, style: mapStyle };

    return !this.isOnMobile && !props.countryProfile
      ? { ...defaultOptions, maxBounds: viewport.bounds }
      : defaultOptions;
  }

  private addMapNav = () => {
    this.nav = new mapboxgl.NavigationControl();
    this.map.addControl(this.nav, 'top-right');
  }

  private colorMap({ data, propertyName, propertyLayer }: PaintMap) {
    if (!data || !data.length) {
      throw new Error('you have to pass in data to color the map');
    }
    const stops = data.filter(obj => obj.id && obj.color).map(obj => {
      if (!obj.id || !obj.color) {
        throw new Error('color and id values missing');
      }

      return [ obj.id, obj.color ];
    });
    this.setMapPaintProperty(stops, propertyLayer, propertyName);
  }

  private setMapPaintProperty(stops: string[][], propertyLayer?: string, propertyName?: string) {
    this.map.setPaintProperty(propertyLayer || 'national', 'fill-color', {
      property: propertyName || this.propertyName,
      type: 'categorical',
      default: lightGrey,
      stops
    });
  }

  private onMapLoad = ({ countryProfile, meta, paint }: Props) => {
    this.map.on('load', () => {
      this.mapLoaded = true;
      this.map.setPaintProperty('background', 'background-color', paint.background || seaBackground);
      if (paint.data && paint.data.length) { this.colorMap(paint); }
      if (countryProfile) {
        this.focusOnCountryOrDistrict(countryProfile, paint);
      }
      this.map.dragRotate.disable();
      this.map.touchZoomRotate.disableRotation();
      if (!countryProfile) { this.zoomListener(); }
      if (meta) {
        this.mouseHoverEvent();
        this.mouseMapClick(meta);
      } // TODO: turn into a this.meta.
      if (!countryProfile) {
        this.dragListener();
        this.persistZoomAndCenterLevel();
      }
      this.resize();
    });
  }

  private focusOnCountryOrDistrict(slug: string, paint: PaintMap) {
    const feature = this.getRegionFeature(slug, paint.propertyLayer);
    if (feature) {
      this.zoomToGeometry(feature.geometry);
      const propertyId: string = feature.properties[paint.propertyName || this.propertyName] || '';
      if (propertyId.length) {
        const stop = [ propertyId, red ];
        this.setMapPaintProperty([ stop ], paint.propertyLayer, paint.propertyName);
      }
    }
  }

  private getRegionFeature(slug: string, propertyLayer?: string): Feature | void {
    const layer = propertyLayer || 'national';
    const slugProperty = this.propertyLayerSlugMap[layer];
    const features: Feature[] = this.map.queryRenderedFeatures({ layers: [ layer ] });
    const regionalFeature: Feature | void = features.find(feature => {
      return feature.properties[slugProperty] && slugProperty !== 'country-slug'
        ? feature.properties[slugProperty].toLowerCase() === slug
        : feature.properties[slugProperty] === slug;
    });

    return regionalFeature;
  }

  private genericTipHtml({ id, country, name, value, uom, year }: GenericTipHtml) {
    const valueStr = value === NODATA ? NODATA : BaseMap.tipToolTipValueStr(value, uom);
    const valueWithYear = year
      ? `${valueStr}<span style="color: white;font-weight: 500;"> in ${year}</span>`
      : valueStr;
    const flagUrl: string = this.props.meta && this.props.meta.country === 'global' ? `/flags/svg/${id}.svg` : '';
    const upperTip = `
      <p style="text-align:center;line-height: 1; margin:0">
        <img  style="max-width: 20px;max-height: 15px;" src="${flagUrl}">
      </p>
      <p style="text-align:center;line-height: 2; margin:0; font-size: 1.2em"> ${country} </p>`;
    const lowerTip = name && name.length
        ? `<em>${name}:<span style="font-size: 1em; font-weight: 700; color:${orange}"> ${valueWithYear}</span></em>`
        : '';

    return `${upperTip}${lowerTip}`;
  }

  tipTemplate(pointData: DH.IMapUnit) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : '';
    if (!pointData.id || !pointData.name || !pointData.id.length || !pointData.name.length) {
      return false;
    }
    const country: string = pointData.name;
    const id: string = pointData.id;
    const theme: string = this.props.meta && this.props.meta.theme ? this.props.meta.theme : '';
    const indicator: string = this.props.meta && this.props.meta.id ? this.props.meta.id : '';
    const detail: string = pointData.detail || NODATA;
    let uom: string = this.props.meta && this.props.meta.uom_display ? this.props.meta.uom_display : '';
    let value: string = NODATA;
    if (pointData.value && this.props.meta && this.props.meta.id) {
      value = BaseMap.setPointDataValue(pointData.value, uom, this.props.meta.id);
    }
    if (pointData.value === null) { value = NODATA; }
    if (this.props.countryProfile) { value = ''; }
    if (theme === 'data-revolution'
      || indicator === 'data_series.fragile_states'
      || indicator === 'data_series.largest_intl_flow') {
      value = detail;
    }
    if (theme === 'government-finance' && pointData.detail) {
      value = `${value} <span style="color: white; font-weight: 400;">[ ${pointData.detail} ]</span>`;
    }
    if (theme === 'government-finance' && pointData.detail && uom === '%') { uom = ''; }
    const opts = { id, value, name, uom, country, year: pointData.year || 0 };

    return !!id && this.genericTipHtml(opts);
  }

  addPopupContent(obj: PopupItem) {
    this.popup
      .setLngLat([ obj.pos.lng, obj.pos.lat ])
      .setHTML(this.tipTemplate(obj.pointData))
      .addTo(this.map);
  }

  setMinimalMapDataPoint(feature: Feature, value?: number): DH.IMapUnit {
    const id = feature.properties[this.props.paint.propertyName || this.propertyName];
    const slugProperty = this.propertyLayerSlugMap[this.props.paint.propertyLayer || 'national'];
    const nameProperty = this.propertyLayerNameMap[this.props.paint.propertyLayer || 'national'];

    return {
      id,
      color: null,
      detail: null,
      uid: '',
      slug: feature.properties[slugProperty],
      name: feature.properties[nameProperty],
      year: 0,
      value: value || null
    };
  }

  private getFeature(features: Feature[]): Feature {
    const paintProperty: string = this.props.paint.propertyName || this.propertyName;
    const feature = features.find(feat => feat.properties[paintProperty]);

    return feature || features[0];
  }

  getMouseHoverPointData(features: Feature[]): DH.IMapUnit | null {
    const feature = this.getFeature(features);
    if (this.props.paint.data && this.props.paint.data.length) {
      const paintProperty: string = this.props.paint.propertyName || this.propertyName;
      // for regular global picture and spotlight map & the small profile maps
      const point: DH.IMapUnit | void = this.props.paint.data.find(obj =>
        obj.id === feature.properties[paintProperty]
      );

      return point || this.setMinimalMapDataPoint(feature);
    }
    if (this.props.countryProfile) {
      return this.setMinimalMapDataPoint(feature, 0);
    }
    if (!this.props.countryProfile && features.length && this.props.meta) {
      // for pre-styled maps i.e survey & regional map
      return this.props.meta.id
        ? this.pointDataForPreStyledMap(features, this.props.meta.id)
        : this.setMinimalMapDataPoint(feature);
    }

    return this.setMinimalMapDataPoint(feature);
  }

  mouseHoverEvent() {
    this.map.on('mousemove', e => {
      const features: Feature[] = this.map.queryRenderedFeatures(e.point);
      if (!features.length && this.popup) {
        return this.popup.remove();
      }
      if (!features.length) {
        return false;
      }
      const pointData: DH.IMapUnit | null = this.getMouseHoverPointData(features);
      if (!pointData) {
        return !!this.popup && this.popup.remove();
      }
      const countryData = globalData.countries.find(data => data.slug === pointData.slug);
      if (countryData && countryData.name !== pointData.name) {
        pointData.name = countryData.name;
      }
      if (!this.popup) {
        this.popup = new mapboxgl.Popup({ offset: 5 });
      }

      return this.addPopupContent({ pointData, pos: e.lngLat });
    });
  }

  zoomListener() {
    this.map.on('zoomend', () => {
      this.zoomLevel = this.map.getZoom();

      return true;
    });
  }

  dragListener() {
    this.map.on('dragend', () => {
      this.center = this.map.getCenter();

      return true;
    });
  }

  // Persists zoom and center on style change
  persistZoomAndCenterLevel() {
    this.map.on('data', e => {
      if (e.dataType === 'style') {
        if (this.zoomLevel) { this.map.setZoom(this.zoomLevel); }
        if (this.center) { this.map.setCenter([ this.center.lng, this.center.lat ]); }
      }
    });
  }

  resize() {
    window.addEventListener('resize', () => {
      this.map.resize();
    });
  }

  mouseMapClick(meta: Meta) {
    this.map.on('click', event => {
      if (meta.id === 'surveyp20' || meta.id === 'regionalp20') {
        return false;
      }
      const feature: Feature = this.getFeature(this.map.queryRenderedFeatures(event.point));
      if (!feature) {
        return false;
      }
      const slugProperty = this.propertyLayerSlugMap[this.props.paint.propertyLayer || 'national'];
      const slug: string | void = feature.properties[slugProperty];
      if (!slug || !this.props.meta || !this.props.meta.country) {
        return false;
      }
      const route: Route = countryOrDistrictLink(this.props.meta.country, slug.toLowerCase());
      this.setState({ profileLoading: true });
      // console.log(route.routePath, route.routeAsPath);

      return this.router.push(route.routePath, route.routeAsPath);
    });
  }

  zoomToGeometry(geometry: Geometry) {
    let bounds: any; // TODO: add proper types
    if (geometry.type === 'Polygon') {
      const coordinates: number[][] = geometry.coordinates[0];
      bounds = coordinates.reduce((boundsx: any, coord) => {
        return boundsx.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    }
    if (geometry.type === 'MultiPolygon') {
      const sets: number[][][] = geometry.coordinates;
      bounds = sets.reduce((boundsx: any, set) => {
        const coordinates: number[] = set[0];
        const innerBounds = coordinates.reduce((inner: any, coord) => {
          return inner.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        return boundsx.extend(innerBounds);
      }, new mapboxgl.LngLatBounds(sets[0][0][0], sets[0][0][0]));
    }
    if (!bounds) {
      return false;
    }
    const dx = (bounds._ne.lat - bounds._sw.lat);
    const dy = (bounds._ne.lng - bounds._sw.lng);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const maxZoom = distance > 30 || this.props.countryProfile === 'usa' ? 1.3 : 3.5;
    const spotlightZoom = this.props.paint.propertyLayer === 'uganda' ? 5.5 : 4.5;
    const yOffset = this.props.paint.propertyLayer === 'uganda' ? -50 : -70;

    return this.map.fitBounds(bounds, {
      padding: 0,
      offset: this.props.paint.propertyLayer === 'national' ? [ 350, 0 ] : [ 400, yOffset ],
      maxZoom: this.props.paint.propertyLayer === 'national' ? maxZoom : spotlightZoom
    });
  }

  static foldOverSurveyMapFeatures(features: Feature[]): DH.IMapUnit {
    type FeatureProps = Feature['properties'] & {total: number; sum: number};
    const props: FeatureProps = features.reverse().reduce((acc, feature) => {
      // this is a country feature;
      const p20: number = feature.properties && feature.properties.p20 ? feature.properties.p20 : 0;
      if (p20 === 0) { return { ...acc, ...feature.properties }; }
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

  private pointDataForPreStyledMap(features: Feature[], indicator: string): DH.IMapUnit | null {
    if (indicator === 'surveyp20') {
      return BaseMap.foldOverSurveyMapFeatures(features);
    }
    const feature = this.getFeature(features);
    if (!feature.properties) {
      throw new Error('Properties missing from map style');
    }
    if (feature.layer.type === 'line') {
      return null;
    }
    const properties = feature.properties;
    const value: number = properties.P20 ? Math.round(properties.P20 * 100) : 0;
    const countryName: string = properties['country-name'] || '';
    const slug: string = properties['country-slug'] || '';
    const id: string = properties.ISO || properties.ISO2 || '';
    const region: string = properties.DHSREGNA ? properties.DHSREGNA : '';
    const name = region ? `Region: ${region}, ${countryName}` : countryName;

    return { value, id, name, detail: '', uid: '', year: 2013, color: '', slug };
  }

  static setPointDataValue(
    value: number, uom?: string, indicator?: string): string {
    if (indicator === 'surveyp20' || indicator === 'regionalp20') {
      return value.toString();
    }
    if (indicator && indicatorsWith0dp.includes(indicator)) {
      return approximate(value, 0, true);
    }
    if (uom === '%' && indicator && indicator.includes('uganda')) {
      return value.toFixed(1);
    }
    if (indicator === 'dataseries.climatevulnerability') {
      return value.toFixed(2);
    }
    if (indicatorsWith2dp.includes(indicator || '')) {
      return approximate(value, 2, true);
    }

    return approximate(value, 1, true);
  }

  static tipToolTipValueStr(value: string | number, uom: string) {
    switch (uom) {
      case '%':
        return `${value}${uom}`;
      default:
        return value;
    }
  }
}

export default BaseMap;
