// @flow
import React from 'react';
import glamorous, { P } from 'glamorous';
import { massive, small} from 'components/theme';
import { red, grey} from 'components/theme/semantic';

export const TabsP = glamorous.p({
  fontSize: massive,
  fontWeight: 'bold',
  color: red,
  marginBottom: '0.2em',
}, (props) => ({
  fontSize: props.fontSize || massive
}));
export const TabsFootNote = glamorous.p({
  fontWeight: 'bold',
  color: grey,
  lineHeight: 0,
}, (props) => ({
  textAlign: props.textAlign || 'center',
  fontSize: props.fontSize || small
}));
export const HeaderTitle = glamorous.h3({
  textAlign: 'center',
  color: grey
});
export const TabsNoData = () => (<TabsP>No data</TabsP>);
