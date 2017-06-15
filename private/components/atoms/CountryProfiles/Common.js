import React from 'react';
import glamorous from 'glamorous';

export const LightBg = glamorous.div({
  background: '#e9e7e8',
  paddingTop: '4em',
  paddingBottom: '4em',
});
export const HeaderGroup = glamorous.div({
  marginTop: '2em',
  '& .header': {
    marginBottom: 0,
    marginTop: 0,
  }
});
export const SectionHeader = glamorous.h2({
  padding: '1em 1em 1em 1em',
  display: 'inline-block',
  margin: 0,
  letterSpacing: '1px',
  lineHeight: 1,
  textTransform: 'uppercase',
  fontSize: '1.0rem',
},
  (props) => ({
    background: props.color || '#e9e7e8'
  }));
