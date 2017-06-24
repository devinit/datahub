// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: Element<any>
};
const MobileMenuItem = ({ children}: Props) => (
  <div className="nav-children">
    {children}
  </div>
);

export default MobileMenuItem;
