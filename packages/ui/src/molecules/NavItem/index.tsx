import Link from 'next/link';
import * as React from 'react';
import { A } from 'glamorous';
import { small } from '../../theme';

export interface Props  {
  path: string;
  pathName: string;
  isActive: boolean;
}
// TODO: check that isActive prop works
const NavItem = ({ path, pathName, isActive }: Props) =>
  (<Link href={path}>
    <A isActive={isActive.toString()} fontSize={small} textDecoration={'none'}>
      {' '}{pathName}{' '}
    </A>
  </Link>);

export default NavItem;
