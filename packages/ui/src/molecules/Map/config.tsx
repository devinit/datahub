import { Viewport } from '../../atoms/BaseMap/types';

export interface MapConfig  {
  paint: {
    propertyLayer: string;
    propertyName: string;
    mapStyle: string;
  };
  viewport: Viewport;
}

export interface MapConfigs  {
  [string]: MapConfig;
}

const mapConfigs: MapConfigs = {
  global: {
    paint: {
      propertyLayer: 'national',
      propertyName: 'ISO2',
      mapStyle: '/styles/worldgeojson.json',
    },
    viewport: {
      zoom: 1,
      center: [25, 20],
      minZoom: 0.5,
      bounds: [
        [-179, -61], // Southwest coordinates
        [188, 75], // Northeast coordinates
      ],
    },
  },
  uganda: {
    paint: {
      propertyLayer: 'uganda',
      propertyName: 'id',
      mapStyle: '/styles/ugandageojson.json',
    },
    viewport: {
      zoom: 5.5,
      minZoom: 3.5,
      center: [33, 0.54],
      bounds: [
        [-179, -61], // TODO: change to correct values Southwest coordinates
        [188, 75], // Northeast coordinates
      ],
    },
  },
  kenya: {
    paint: {
      propertyLayer: 'kenya',
      propertyName: 'ID',
      mapStyle: '/styles/kenyageojson.json',
    },
    viewport: {
      center: [37.65, 0.85],
      zoom: 5,
      minZoom: 3,
      bounds: [
        [-179, -61], // Southwest coordinates
        [188, 75], // Northeast coordinates
      ],
    },
  },
};
export default mapConfigs;
