import React from 'react';
import glamorous from 'glamorous';
import {lightBlack, lighterGrey} from 'components/theme/semantic';

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
export const MapBackground = glamorous.div({
  background: lighterGrey,
  width: '100%',
  height: '600px',
  '@media(max-width: 1000px)': {
    height: '480px'
  }
});
