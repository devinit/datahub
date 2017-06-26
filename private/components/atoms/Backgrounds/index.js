import React from 'react';
import glamorous from 'glamorous';
import {lightBlack} from 'components/theme/semantic';

export const LightBg = glamorous.div({
  background: '#e9e7e8',
  paddingTop: '4em',
  paddingBottom: '4em',
});
export const DarkBg = glamorous.div({
  background: lightBlack,
  paddingTop: '2em',
  paddingBottom: '2em',
  textAlign: 'center'
});
