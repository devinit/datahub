import * as React from 'react';

export interface Props  {
  children: any;
}

const MobileMenuItem = ({ children }: Props) =>
  (<div className="nav-children">
    {children}
  </div>);

export default MobileMenuItem;
