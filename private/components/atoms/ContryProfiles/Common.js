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
export const SectionHeader = glamorous.h2({
  padding: '1em 2em 1em 1em',
  display: 'inline-block',
  margin: 0,
  letterSpacing: '1px',
  lineHeight: 1,
  textTransform: 'uppercase'
},
  (props) => ({
    color: props.color || '#e9e7e8'
  }));
