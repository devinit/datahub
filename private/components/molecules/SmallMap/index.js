// @flow
import React from 'react';
import BaseMap from 'components/atoms/BaseMap';
import type {PaintMap, Meta} from 'components/atoms/BaseMap';
import Nossr from 'react-no-ssr';
// import countries from 'components/organisms/CountrySearchInput/data';
import {white} from 'components/theme/semantic';

type Props = {
  slug: string;
  spotlightCountry?: string;
}
type MapProps = {
  paint: PaintMap,
  meta: Meta,
  countryProfile: string,
  spotlightCountry?: string
}
const getMeta = (spotlightCountry?: string): Meta =>
  ({
    name: '',
    uom_display: '',
    theme: '',
    id: '',
    country: spotlightCountry || 'global'
  });
const mapProps = ({slug, spotlightCountry}: Props): MapProps => {
  const paint = ({background: white, propertyName: 'ISO2'}: PaintMap);
  const meta = getMeta(spotlightCountry);
  return {paint, meta, countryProfile: slug};
};
const smallMap = (props: Props) => {
  const baseMapProps = mapProps(props);
  return (
    <Nossr loading={<p>loading...</p>}>
      <BaseMap {...baseMapProps} />
    </Nossr>
  );
};

export default smallMap;
