// @flow
import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const buttonStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const button = (props: Element<any>) => (
  <Button {...props} />
  );

export default button;
