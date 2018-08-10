import glamorous from 'glamorous';
import { red, white } from '../../theme/semantic';
import { Container } from 'semantic-ui-react';
import Logo from '../../atoms/Logo';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { Menu } from './types';
import { LinkState } from 'next/link';
import * as React from 'react';

const MenuContainer = glamorous.div({
  backgroundColor: red,
  color: white,
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 450,
  overflow: 'visible',
  boxShadow: '0 0 16px rgba(0,0,0,.3)' // TODO:add to color variables
});

export type Props = Menu & {
  nextLink?: React.ComponentClass<LinkState>;
};

const menu = (props: Props) =>
  <MenuContainer>
    <Container>
      <Logo />
      <DesktopMenu { ...props } />
      <MobileMenu { ...props } />
    </Container>
  </MenuContainer>;

export default menu;
