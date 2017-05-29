// @flow
import React from 'react';
import type { Element } from 'react';
import { Button } from 'semantic-ui-react';

type Props = {
  children?: Element<any>,
  onClick?: (value: string | void) => void,
  content?: string,
  primary?: boolean, // i got this from the semantic-ui-react code
  secondary?: boolean
};

const button = ({ onClick, children, content, primary, secondary }: Props) => (
  <Button primary={primary} secondary={secondary} onClick={onClick}> {children || content} </Button>
);

export default button;
