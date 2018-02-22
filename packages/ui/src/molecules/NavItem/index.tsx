import * as React from 'react';
import { A } from 'glamorous';
import {IProcess} from '@devinit/dh-base/lib/types';
import { small } from '../../theme';

declare var process: IProcess;

const Link = process.env && process.env.config && process.env.config.NEXT ? require('next/Link') : null;

export interface Props  {
  path: string;
  pathName: string;
  // isActive?: boolean;
}
// TODO: check that isActive prop works
const NavItem = ({ path, pathName}: Props) => {
  const LinkContent =
    <A fontSize={small} textDecoration={'none'}>
      {' '}{pathName}{' '}
    </A>;
  return Link ?
    <Link href={path} prefetch>
      {LinkContent}
    </Link> :
    <a href={path}>
     {LinkContent}
    </a>;
};

export default NavItem;
