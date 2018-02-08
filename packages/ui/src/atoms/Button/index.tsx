import * as React from 'react';
import { Button } from 'semantic-ui-react';

interface Props  {
  children?: React.ReactChild;
  onClick?: (event: any) => void;
  content?: string;
  primary?: boolean; // i got this from the semantic-ui-react code
  secondary?: boolean;
  extra?: any;
}

const button = ({ onClick, children, content, primary, secondary }: Props) =>
  (<Button primary={primary} secondary={secondary} onClick={onClick}>
    {' '}{children || content}{' '}
  </Button>);

export default button;
