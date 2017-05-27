// @flow
import React from 'react';
import type { Element } from 'react';
import { Button } from 'semantic-ui-react';

type Props = {
  children?: Element<any>,
  onClick?: (value: string | void) => void,
  props?: any
}

const button = ({ props, onClick, children }: Props) => (
  <Button {...props} onClick={onClick}> {children} </Button>
  );

export default Button;
