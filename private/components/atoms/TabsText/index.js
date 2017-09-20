// @flow
import React from 'react';
import glamorous from 'glamorous';
import { massive, small} from 'components/theme';
import { red, grey} from 'components/theme/semantic';

export const TabsP = glamorous.p({
  fontSize: massive,
  fontWeight: 'bold',
  textAlign: 'center',
  color: red,
  lineHeight: 1.1,
  marginBottom: '0.2em',
}, (props) => ({
  fontSize: props.fontSize || massive
}));
export const TabsFootNote = glamorous.p({
  fontWeight: 'bold',
  color: grey,
}, (props) => ({
  textAlign: props.textAlign || 'center',
  fontSize: props.fontSize || small,
  lineHeight: props.lineHeight || 0,
}));
export const HeaderTitle = glamorous.h3({
  textAlign: 'center',
  fontSize: '1.2em',
  color: grey
});
export const TabWrapper = glamorous.div({
  fontWeight: 'bold',
  textAlign: 'center'
});
export const TabsNoData = () => (<TabsP>No data</TabsP>);
