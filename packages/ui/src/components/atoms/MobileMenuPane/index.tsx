// @flow
import * as React from 'react';
import { Element } from 'react';

interface Props  {
  children: Element<any>;
}

const MobileMenuItem = ({ children }: Props) =>
  (<div className="nav-children">
    {children}
  </div>);

export default MobileMenuItem;
