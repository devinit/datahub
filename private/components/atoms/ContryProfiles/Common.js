import React from 'react';
import glamorous from 'glamorous';

export const LightBg = glamorous.div({
  background: '#e9e7e8',
  paddingTop: '3em',
  paddingBottom: '3em',
});
export const HeaderGroup = glamorous.div({
  marginTop: '2em',
  '& .header': {
    marginBottom: 0,
    marginTop: 0,
  }
});
