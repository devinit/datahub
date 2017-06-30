import React from 'react';
import glamorous from 'glamorous';
import {red, lightBlack} from 'components/theme/semantic';

export const Lead = glamorous.p({
  marginTop: '1rem',
  fontSize: '1.8rem',
  fontWeight: 300,
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
  '& span': {
    color: red
  }
},
  (props) => ({
    background: props.color || '#e9e7e8',
    color: props.fontColor || lightBlack
  }));
