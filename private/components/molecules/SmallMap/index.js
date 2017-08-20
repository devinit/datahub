// @flow
import React from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type { PaintMap, Meta, Viewport } from 'components/atoms/BaseMap/types';
import configs from 'components/molecules/Map/config';
import { white } from 'components/theme/semantic';

type Props = {
  slug: string,
  spotlightCountry?: string,
};
type MapProps = {
  paint: PaintMap,
  meta: Meta,
  viewport: Viewport,
  countryProfile: string,
  spotlightCountry?: string,
};
const getMeta = (spotlightCountry?: string): Meta => ({
  name: '',
  uom_display: '',
  theme: '',
  id: '',
  country: spotlightCountry || 'global',
});

const mapProps = ({ slug, spotlightCountry }: Props): MapProps => {
  const paintProps = spotlightCountry ? configs[spotlightCountry].paint : configs.global.paint;
  const paint = ({ background: white, ...paintProps }: PaintMap);
  const meta = getMeta(spotlightCountry);
  const viewport = { ...configs.global.viewport };
  return { paint, meta, countryProfile: slug, viewport };
};
const smallMap = (props: Props) => {
  const baseMapProps = mapProps(props);
  return (<BaseMap {...baseMapProps} />);
};

export default smallMap;
