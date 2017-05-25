// @flow
import React from 'react';
import type { Element } from 'react';


type Props = {
  children: Element<any>,
  onClick?: (value: string | void) => void
}

const buttonStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const Button = ({ children, onClick }: Props) => (
  <button style={buttonStyles} onClick={onClick}>
    {children}
  </button>
);


export default Button;
