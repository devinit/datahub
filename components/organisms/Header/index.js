// @flow
import Link from 'next/link';
import React from 'react';
import Header from '../../molecules/NavMenu';

type Props = {
  pathName: string
}

const links = [
  { path: '/', pathName: 'home', id: 1 },
  { path: '/about', pathName: 'about', id: 2 },
];

const HeaderContainer = ({ pathName }: Props) => (
  <Header links={links} current={pathName} />
);

export default HeaderContainer;
