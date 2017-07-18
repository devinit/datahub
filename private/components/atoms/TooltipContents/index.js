// @flow
import React from 'react';
import type { Element } from 'react';
import glamorous from 'glamorous';

type Props = {
  children: Element<any>,
  active: boolean,
  position?: string,
};
const Container = glamorous.div({
  position: 'absolute',
  wordWrap: 'break-word',
  minWidth: '230px',
  maxWidth: '400px',
  background: '#fff',
  borderRadius: '3px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  fontSize: '0.9375em',
  lineHeight: '1.4em',
  padding: '10px',
  zIndex: 2,
  textAlign: 'left',
  color: '#555',
  '&&after::': {
    content: '',
    position: 'absolute',
    marginLeft: '-7px',
    border: '14px solid transparent',
    left: '32px',
    top: '-12px',
    borderBottomColor: 'white',
    borderTop: 'none'
  },
  '&&before::': {
    top: '-14px',
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    borderTop: 'none',
    left: '32px',
    content: '',
    position: 'absolute',
    marginLeft: '-7px',
    border: '14px solid transparent'
  }
}, (props) => ({display: props.active ? 'block' : 'none'}));
const TooltipContents = ({ children, active, position}: Props) => (
  <Container
    active={active}
    position={position}
  >
    {children}
  </Container>
);

export default TooltipContents;

