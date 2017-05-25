// @flow
import Link from 'next/link';
import React from 'react';
import { Menu } from 'semantic-ui-react';
// import Header from '../../molecules/NavMenu';

// type Props = {
//   pathName: string
// }

// const links = [
//   { path: '/', pathName: 'home', id: 1 },
//   { path: '/about', pathName: 'about', id: 2 },
// ];

const MenuContainer = (props: {}) => (
  <Menu {...props} />
);

export default MenuContainer;
