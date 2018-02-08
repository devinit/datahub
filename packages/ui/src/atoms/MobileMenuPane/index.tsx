import * as React from 'react';

interface Props  {
  children: any;
}

const MobileMenuItem = ({ children }: Props) =>
  (<div className="nav-children">
    {children}
  </div>);

export default MobileMenuItem;
