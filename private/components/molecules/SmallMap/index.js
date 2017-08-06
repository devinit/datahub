// @flow
import React from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {Viewport, PaintMap} from 'components/atoms/BaseMap';
// import config from 'components/molecules/Map';
import Nossr from 'react-no-ssr';
import countries from 'components/organisms/CountrySearchInput/data';
import {red, white} from 'components/theme/semantic';

type Props = {
  slug: string;
  spotlightCountry?: string;
}
type ViewportAndPaint = {
  viewport: Viewport,
  paint: PaintMap
}
type Country = {
  slug: string;
  id: string;
  name: string;
  lng: number;
  lat: number;
}
const bounds = [
  [-179, -61], // TODO: change to correct values Southwest coordinates
  [188, 75]  // Northeast coordinates
];
const viewportAndPaint = ({slug, spotlightCountry}: Props): ViewportAndPaint => {
  const entity: Country = countries.find(obj => obj.slug === slug);
  const center = [entity.lng - 30, entity.lat];
  const zoom = spotlightCountry && spotlightCountry === 'uganda' ? 9 : 3;
  const minZoom = spotlightCountry && spotlightCountry === 'uganda' ? 10 : 1;
  const viewport = { zoom, center, minZoom, scrollZoom: true, bounds};
  const data = [{
    id: entity.id,
    color: red,
    detail: '',
    uid: '',
    year: 0,
    value: 0,
    slug: entity.slug,
    name: entity.name }];
  const paint = ({data, background: white}: PaintMap);
  return {viewport, paint};
};

const smallMap = (props: Props) => {
  const {viewport, paint} = viewportAndPaint(props);
  return (
    <Nossr loading={<p>loading...</p>}>
      <BaseMap paint={paint} viewport={viewport} />
    </Nossr>
  );
};

export default smallMap;
