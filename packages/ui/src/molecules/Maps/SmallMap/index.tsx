import * as React from 'react';
import BaseMap from '../../../atoms/BaseMap';
import { PaintMap, Meta, Viewport } from '../../../atoms/BaseMap/types';
import configs from '../Map/config';
import { white } from '../../../theme/semantic';

export interface Props  {
  slug: string;
  spotlightCountry?: string;
}

export interface MapProps  {
  paint: PaintMap;
  meta: Meta;
  viewport: Viewport;
  countryProfile: string;
  spotlightCountry?: string;
}

const getMeta = (spotlightCountry?: string): Meta => ({
  name: '',
  uom_display: '',
  theme: '',
  id: '',
  country: spotlightCountry || 'global',
});

const mapProps = ({ slug, spotlightCountry }: Props): MapProps => {
  const paintProps = spotlightCountry ? configs[spotlightCountry].paint : configs.global.paint;
  const paint = { background: white, ...paintProps };
  const meta = getMeta(spotlightCountry);
  const viewport = { ...configs.global.viewport };
  return { paint, meta, countryProfile: slug, viewport };
};
const SmallMap = (props: Props) => {
  const baseMapProps = mapProps(props);
  return (<BaseMap {...baseMapProps} />);
};

export default SmallMap;
