// @flow
import React from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {Viewport, PaintMap, MapData, Meta} from 'components/atoms/BaseMap';
// import config from 'components/molecules/Map';
import Nossr from 'react-no-ssr';
import countries from 'components/organisms/CountrySearchInput/data';
// import districts from 'components/organisms/SpotLightNavTabs/data';
import {red, white} from 'components/theme/semantic';

type Props = {
  slug: string;
  spotlightCountry?: string;
}
type MapProps = {
  viewport: Viewport,
  paint: PaintMap,
  meta: Meta
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
const getPaintData = (entity: Country): MapData[] => {
  const others: MapData[] = countries
    .filter(obj => obj.slug !== entity.slug)
    .map(obj => ({
      id: obj.id,
      color: '',
      detail: '',
      uid: '',
      year: 0,
      value: 0,
      slug: obj.slug,
      name: obj.name }));
  return others.concat([{
    id: entity.id,
    color: red,
    detail: '',
    uid: '',
    year: 0,
    value: 0,
    slug: entity.slug,
    name: entity.name }]);
};
const getViewport = (entity: Country, spotlightCountry?: string): Viewport => {
  const center = [entity.lng - 30, entity.lat];
  const zoom = spotlightCountry && spotlightCountry === 'uganda' ? 9 : 3;
  const minZoom = spotlightCountry && spotlightCountry === 'uganda' ? 10 : 1;
  return { zoom, center, minZoom, scrollZoom: true, bounds};
};
const getMeta = (spotlightCountry?: string): Meta =>
  ({
    name: '',
    uom_display: '',
    theme: '',
    id: '',
    country: spotlightCountry || 'global'
  });
const mapProps = ({slug, spotlightCountry}: Props): MapProps => {
  const entity: Country = countries.find(obj => obj.slug === slug);
  const viewport = getViewport(entity, spotlightCountry);
  const data = getPaintData(entity);
  const paint = ({data, background: white, propertyName: 'ISO2'}: PaintMap);
  const meta = getMeta(spotlightCountry);
  return {viewport, paint, meta};
};

const smallMap = (props: Props) => {
  const {viewport, paint, meta} = mapProps(props);
  return (
    <Nossr loading={<p>loading...</p>}>
      <BaseMap paint={paint} viewport={viewport} isForProfile meta={meta} />
    </Nossr>
  );
};

export default smallMap;
