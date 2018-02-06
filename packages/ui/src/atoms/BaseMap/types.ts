export interface State {
  profileLoading: boolean; // think loading new country on map click
  shouldForceRedraw: boolean;
}
export interface Viewport {
  zoom: number;
  center: number[];
  bounds: number[][];
  maxBounds?: number[][];
  minZoom: number;
}
export interface ViewportDefaults {
  attributionControl: boolean;
  scrollZoom: boolean;
}
export interface MapData {
  id?: string;
  slug?: string;
  name?: string;
  color?: string;
  year?: number;
  uid?: string;
  detail?: string;
  value?: number;
}

export interface PaintMap {
  data?: MapData[];
  center?: number[];
  mapStyle?: string; // we have a default style
  baseColor?: string;
  propertyName?: string;
  propertyLayer?: string;
  paintProperty?: string;
  background?: string;
}

export interface Meta {
  uom_display: string;
  theme: string;
  country: string; // global or uganda for spotlight uganda
  id: string;
  // map indicator user friendly label / slug eg Poverty
  name: string;
}

export interface Props {
  paint: PaintMap;
  viewport: Viewport;
  meta?: Meta;
  countryProfile?: string;
  width?: number | string;
  height?: number | string;
}

export type MapBoxOptions = & Viewport & ViewportDefaults & {
  style: string;
  container: HTMLDivElement | string;
};

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Feature {
  properties: {
    id?: string;
    ISO2?: string;
    value?: number;
    interface?: string;
    ISO?: string;
    P20?: number;
    p20?: number;
    DHSREGNA?: string;
    CNTRYNAMEE?: string;
    'country-slug'?: string;
    'country-name'?: string;
    NAME?: string;
    name?: string;
    dhsreg?: string;
  };
  layer: {
    interface: string;
    type: string;
  };
  geometry: Geometry;
}

export interface Point {
  lng: number;
  lat: number;
}

export interface PopupItem {
  pointData: MapData;
  pos: Point;
}

export interface GenericTipHtml {
  id: string;
  country: string;
  name: string;
  uom: string;
  year: string | number;
  value: string | number;
}

export interface PropertyLayerSlugMap {
  national: string;
  kenya: string;
  uganda: string;
}
