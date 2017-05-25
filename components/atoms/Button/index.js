// @flow
import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
// import '../../../node_modules/semantic-ui/dist/semantic.min.css';
// import
// type Props = {
//   children: Element<any>,
//   onClick?: (value: string | void) => void
// }

const buttonStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

// const button = ({ children, onClick }: Props) => (
//   <Button style={buttonStyles} onClick={onClick}>
//     {children}
//   </Button>
// );

const button = (props) => (
  <Button {...props} />
  );

export default button;
