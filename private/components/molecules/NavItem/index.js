// @flow
import Link from 'next/link';
import React from 'react';
import NavTag from '../../atoms/NavTag';

type Props = {
  path: string,
  pathName: string,
  isActive: boolean
};

const NavItem = ({ path, pathName, isActive }: Props) => (
  <Link href={path}>
    <NavTag isActive={isActive} size="small"> {pathName} </NavTag>
  </Link>
);

export default NavItem;
