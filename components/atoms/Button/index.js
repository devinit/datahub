// @flow
import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const button = (props: Element<any>) => (
  <Button {...props} />
  );

export default button;
