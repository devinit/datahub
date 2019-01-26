import * as React from 'react';
import glamorous, { GlamorousComponent, Span } from 'glamorous';
import { massive } from '../../../theme';
import { grey, lightRed, red } from '../../../theme/semantic';

export const TabsP: GlamorousComponent<any, any> = glamorous.p<{fontSize?: any; }>({
  fontSize: massive,
  fontWeight: 'bold',
  textAlign: 'center',
  color: red,
  lineHeight: 1.1,
  marginBottom: '0.2em'
}, (props) => ({
  fontSize: props.fontSize || massive
}));
export const TabsFootNote: GlamorousComponent<any, any> =
glamorous.p<{textAlign?: any; fontSize?: any; lineHeight?: number; }>({
  fontWeight: 'bold',
  color: grey
}, (props) => ({
  textAlign: props.textAlign || 'center',
  fontSize: props.fontSize || '0.9em',
  lineHeight: props.lineHeight || 1
}));
export const HeaderTitle = glamorous.h3({
  textAlign: 'center',
  fontSize: '1.2em',
  color: grey
});

export const RuralUrbanPopnText = () =>
  <span>
    WHAT IS THE <Span color={ red }>URBAN</Span> VS <Span color={ lightRed }>RURAL</Span> SPLIT?
  </span>;

export const TabsNoData = () => (<TabsP>No data</TabsP>);
