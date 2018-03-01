import * as React from 'react';
import { lightGrey, seaBackground, orange, red } from '../../theme/semantic';
import {Route, approximate, countryOrDistrictLink} from '../../../utils';
import LoadingBar from '../../molecules/LoadingBar';
import {router, IRouter} from '../../../utils';
import { MapContainer } from './styledMapContainer';
import {SingletonRouter} from 'next/router';
import {
  Feature,
  PropertyLayerSlugMap,
  PaintMap,
  Viewport,
  Point,
  PopupItem,
  MapBoxOptions,
  ViewportDefaults,
  Geometry,
  GenericTipHtml,
  Meta,
} from './types';

// TODO: this is a hack
const mapboxgl = (process as any).browser ? require('mapbox-gl') : {};

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
export const indicatorsWith2dp = ['fact.oda_to_ldcs_percent_gni', 'fact.oda_percent_gni'];

export const indicatorsWith0dp = [
  'spotlightonuganda.ugandaurbanpop',
  'spotlightonuganda.ugandaruralsafewater',
  'spotlightonuganda.ugandaruralwaterfunc',
  'spotlightonuganda.ugandawatersourcecommfunc',
  'spotlightonuganda.ugandawashperfscore',
  'dataseries.numberofunappeals',
  'spotlightonuganda.ugandahealthposts',
  'dataseries.forgottencrisis'];

class BaseMap extends React.Component<Props, State> {

  public static foldOverSurveyMapFeatures(features: Feature[]): DH.IMapUnit {
    type FeatureProps = Feature['properties'] & {total: number; sum: number};
    const props: FeatureProps = features.reverse().reduce((acc, feature) => {
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

  public static pointDataForPreStyledMap(features: Feature[], indicator: string): DH.IMapUnit | null {
    if (indicator === 'surveyp20') return BaseMap.foldOverSurveyMapFeatures(features);
    if (!features[0].properties) throw new Error('Properties missing from map style');
    if (features[0].layer.type === 'line') return null;
    const properties = features[0].properties;
    const value: number = properties.P20 ? Math.round(properties.P20 * 100) : 0;
    const countryName: string = properties['country-name'] || '';
    const slug: string = properties['country-slug'] || '';
    const id: string = properties.ISO || '';
    const region: string = properties.DHSREGNA ? properties.DHSREGNA : '';
    const name = region ? `Region: ${region} ,  ${countryName}` : countryName;
    return { value, id, name, detail: '', uid: '', year: 2013, color: '', slug};
  }
  public static setPointDataValue(
    value: number, uom?: string, indicator?: string): string {
    if (indicator === 'surveyp20' || indicator === 'regionalp20') return value.toString();
    if (indicator && indicatorsWith0dp.includes(indicator)) return approximate(value, 0, true);
    if (uom === '%' && indicator && indicator.includes('uganda')) return value.toFixed(1);
    if (indicator === 'dataseries.climatevulnerability') return value.toFixed(2);
    if (indicatorsWith2dp.includes(indicator || '')) return approximate(value, 2, true);
    return approximate(value, 1, true);
  }
  public static tipToolTipValueStr(value: string | number, uom: string) {
    switch (uom) {
      case '%':
        return `${value}${uom}`;
      default:
        return value;
    }
  }
  public viewportDefaults: ViewportDefaults = {
      attributionControl: true,
      scrollZoom: false,
    };
  public propertyName: string = 'ISO2';
  public mapLoaded: boolean = false;
  public isOnMobile: boolean = false;
  public map: any;
  public nav: any;
  public popup: { remove: any,  setLngLat: (args: any[]) => any; } & any;
  public center: Point;
  public zoomLevel: number;
  public element: HTMLDivElement;
  public propertyLayerSlugMap: PropertyLayerSlugMap = {
      national: 'country-slug',
      uganda: 'name',
      kenya: 'NAME_2'
  };
  public propertyLayerNameMap: PropertyLayerSlugMap = {
      ...this.propertyLayerSlugMap,
      national: 'country-name',
  };
  public router: IRouter;
  constructor(props: Props) {
    super(props);
    if (!props.viewport) throw new Error('viewport prop missing in basemap props');
    if (!props.paint) throw new Error('paint prop missing in basemap props');
    this.isOnMobile = window.innerWidth < 1200;
    this.state = {
      profileLoading: false,
      shouldForceRedraw: false
    };
    this.router = this.props.router ? this.props.router : router;
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.paint.mapStyle !== this.props.paint.mapStyle ||
      this.props.countryProfile !== nextProps.countryProfile) {
      this.setState({shouldForceRedraw: true});
    }
  }
  public genericTipHtml({ id, country, name, value, uom, year }: GenericTipHtml) {
    const valueStr = value === NODATA ? NODATA : BaseMap.tipToolTipValueStr(value, uom);
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
  public tipTemplate(pointData: DH.IMapUnit) {
    const name = this.props.meta && this.props.meta.name ? this.props.meta.name : '';
    if (!pointData.id || !pointData.name || !pointData.id.length || !pointData.name.length) {
      return false;
    }
    const country: string = pointData.name;
    const id: string = pointData.id;
    const theme: string = this.props.meta && this.props.meta.theme ? this.props.meta.theme : '';
    const indicator: string = this.props.meta && this.props.meta.id ? this.props.meta.id : '';
    const detail: string = pointData.detail || NODATA;
    let uom: string =
      this.props.meta && this.props.meta.uom_display ? this.props.meta.uom_display : '';
    let value: string = NODATA;
    if (pointData.value !== null && pointData.value !== undefined &&
      this.props.meta && this.props.meta.id) {
      value = BaseMap.setPointDataValue(pointData.value, uom, this.props.meta.id);
    }
    if (pointData.value === null) value = NODATA;
    if (this.props.countryProfile) value = '';
    if (theme === 'data-revolution' || indicator === 'dataseries.fragilestates'
      || indicator === 'dataseries.largestintlflow') {
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
  public addPopupContent(obj: PopupItem) {
    this.popup
      .setLngLat([obj.pos.lng, obj.pos.lat])
      .setHTML(this.tipTemplate(obj.pointData))
      .addTo(this.map);
  }
  public setMinimalMapDataPoint(feature: Feature, value?: number): DH.IMapUnit {
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
      value: value || null,
    };
  }
  public getMouseHoverPointData(features: Feature[]): DH.IMapUnit | null {
    if (this.props.paint.data && this.props.paint.data.length) {
      // for regular global picture and spotlight map & the small profile maps
      const point: DH.IMapUnit | void = this.props.paint.data.find(obj => {
        const paintProperty: string = this.props.paint.propertyName || this.propertyName;
        return obj.id === features[0].properties[paintProperty];
      });
      return point || this.setMinimalMapDataPoint(features[0]);
    }
    if (this.props.countryProfile) return this.setMinimalMapDataPoint(features[0], 0);
    if (!this.props.countryProfile && features.length > 1 && this.props.meta) {
      // for pre-styled maps i.e survey & regional map
      if (this.props.meta.id) return BaseMap.pointDataForPreStyledMap(features, this.props.meta.id);
      return this.setMinimalMapDataPoint(features[0]);
    }
    return this.setMinimalMapDataPoint(features[0]);
  }
  public mouseHoverEvent() {
    this.map.on('mousemove', e => {
      const features: Feature[] = this.map.queryRenderedFeatures(e.point);
      if (!features.length && this.popup) return this.popup.remove();
      if (!features.length) return false;
      const pointData: DH.IMapUnit | null = this.getMouseHoverPointData(features);
      if (!pointData && this.popup) return this.popup.remove();
      if (!pointData) return false;
      if (pointData && !this.popup) this.popup = new mapboxgl.Popup({ offset: 5 });
      return this.addPopupContent({ pointData, pos: e.lngLat });
    });
  }
  public zoomListener() {
    this.map.on('zoomend', () => {
      this.zoomLevel = this.map.getZoom();
      return true;
    });
  }
  public dragListener() {
    this.map.on('dragend', () => {
      this.center = this.map.getCenter();
      return true;
    });
  }
  // Persists zoom and center on style change
  public persistZoomAndCenterLevel() {
    this.map.on('data', e => {
      if (e.dataType === 'style') {
        if (this.zoomLevel) this.map.setZoom(this.zoomLevel);
        if (this.center) this.map.setCenter([this.center.lng, this.center.lat]);
      }
    });
  }
  public resize() {
    window.addEventListener('resize', () => {
      this.map.resize();
    });
  }
  public mouseMapClick(meta: Meta) {
    this.map.on('click', event => {
      if (meta.id === 'surveyp20' || meta.id === 'regionalp20') return false;
      const features: Feature[] = this.map.queryRenderedFeatures(event.point);
      if (!features.length) return false;
      const slugProperty = this.propertyLayerSlugMap[this.props.paint.propertyLayer || 'national'];
      const slug: string | void = features[0].properties[slugProperty];
      if (!slug) return false;
      if (!this.props.meta || !this.props.meta.country) return false;
      const route: Route = countryOrDistrictLink(this.props.meta.country, slug.toLowerCase());
      this.setState({ profileLoading: true });
      return this.router.push(route.routePath, route.routeAsPath);
    });
  }
  public setMapPaintProperty(stops: string[][], propertyLayer?: string, propertyName?: string) {
    this.map.setPaintProperty(propertyLayer || 'national', 'fill-color', {
      property: propertyName || this.propertyName,
      type: 'categorical',
      default: lightGrey,
      stops,
    });
  }
  public colorMap({ data, propertyName, propertyLayer }: PaintMap) {
    if (!data || !data.length) throw new Error('you have to pass in data to color the map');
    const stops = data.filter(obj => obj.id && obj.color).map((obj: DH.IMapUnit) => {
      if (!obj.id || !obj.color) throw new Error('color and id values missing');
      return [obj.id, obj.color];
    });
    this.setMapPaintProperty(stops, propertyLayer, propertyName);
  }
  public getRegionFeature(slug: string, propertyLayer?: string): Feature | void {
    const layer = propertyLayer || 'national';
    const slugProperty = this.propertyLayerSlugMap[layer];
    const features: Feature[] = this.map.queryRenderedFeatures({ layers: [layer] });
    const feature: Feature | void = features.find(featurex => {
      if (featurex.properties[slugProperty] && slugProperty !== 'country-slug') {
        return featurex.properties[slugProperty].toLowerCase() === slug;
      }
      return featurex.properties[slugProperty] === slug;
    });
    return feature;
  }
  public zoomToGeometry(geometry: Geometry) {
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
    if (!bounds) return false;
    const dx = (bounds._ne.lat - bounds._sw.lat);
    const dy = (bounds._ne.lng - bounds._sw.lng);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const maxZoom = distance > 30 || this.props.countryProfile === 'usa' ? 1.3 : 3.5;
    const spotlightZoom = this.props.paint.propertyLayer === 'uganda' ? 5.5 : 4.5;
    const yOffset = this.props.paint.propertyLayer === 'uganda' ? -50 : -70;
    return this.map.fitBounds(bounds, {
      padding: 0,
      offset: this.props.paint.propertyLayer === 'national' ? [350, 0] : [400, yOffset],
      maxZoom: this.props.paint.propertyLayer === 'national' ? maxZoom : spotlightZoom,
    });
  }
  public focusOnCountryOrDistrict(slug: string, paint: PaintMap) {
    const feature = this.getRegionFeature(slug, paint.propertyLayer);
    if (feature) {
      this.zoomToGeometry(feature.geometry);
      const propertyId: string = feature.properties[paint.propertyName || this.propertyName] || '';
      if (propertyId.length) {
        const stop = [propertyId, red];
        this.setMapPaintProperty([stop], paint.propertyLayer, paint.propertyName);
      }
    }
  }

  public draw(domElement: HTMLDivElement, paint: PaintMap) {
    const viewport = { ...this.viewportDefaults, ...this.props.viewport };
    const mapStyle = this.props.paint.mapStyle || '/styles/worldgeojson.json';
    const defaultOpts = { ...viewport, style: mapStyle, container: domElement };
    const opts: MapBoxOptions = !this.isOnMobile && !this.props.countryProfile
      ? { ...defaultOpts, maxBounds: viewport.bounds }
      : defaultOpts;
    // draw map
    if (!this.map || this.state.shouldForceRedraw) {
      if (this.map) {
        this.map.remove();
        this.nav = undefined;
      }
      this.mapLoaded = false; // feels abit dirty
      this.map = new mapboxgl.Map(opts);
    }
    if (!this.nav && !this.mapLoaded) this.addMapNav();
    // React creates a new class instance per render which gets memoized
    if (this.map && this.mapLoaded && paint.data && paint.data.length) this.colorMap(paint);

    if (!this.mapLoaded) this.onMapLoad(paint);
  }

  public addMapNav = () => {
    this.nav = new mapboxgl.NavigationControl();
    this.map.addControl(this.nav, 'top-right');
  }

  public onMapLoad = (paint: PaintMap) => {
    this.map.on('load', () => {
      this.mapLoaded = true;
      this.map.setPaintProperty(
        'background',
        'background-color',
        paint.background || seaBackground,
      );
      if (paint.data && paint.data.length) this.colorMap(paint);
      if (this.props.countryProfile) {
        this.focusOnCountryOrDistrict(this.props.countryProfile, paint);
      }
      this.map.dragRotate.disable();
      this.map.touchZoomRotate.disableRotation();
      if (!this.props.countryProfile) this.zoomListener();
      if (this.props.meta) this.mouseHoverEvent(); // TODO turn into a this.meta.
      if (this.props.meta) this.mouseMapClick(this.props.meta);
      if (!this.props.countryProfile) this.dragListener();
      if (!this.props.countryProfile) this.persistZoomAndCenterLevel();
      this.resize();
    });
  }
  public render() {
    let { width, height } = this.props;
    if (!width) width = '100%';
    if (!height) height = window.innerWidth < 1000 ? 480 : 600;
    return (
      <MapContainer>
        <LoadingBar loading={this.state.profileLoading} />
        <div
          style={{ width, height, position: 'relative' }}
          ref={element => {
            if (element) this.draw(element, this.props.paint);
          }}
        />
      </MapContainer>
    );
  }
}

export default BaseMap;
