// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: Element<any>
};
const Pane = ({ children}: Props) => (
  <div>
    {children}
  </div>
);

export default Pane;
