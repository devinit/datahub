// @flow
import Link from 'next/link';
import React from 'react';
import { A } from 'glamorous';
import { small } from '../../theme';

type Props = {
  path: string,
  pathName: string,
  isActive: boolean,
};
const NavItem = ({ path, pathName, isActive }: Props) =>
  (<Link href={path}>
    <A isActive={isActive} fontSize={small} textDecoration={'none'}>
      {' '}{pathName}{' '}
    </A>
  </Link>);

export default NavItem;
