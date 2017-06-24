import glamorous from 'glamorous';
import theme from 'components/theme';
import {white} from 'components/theme/semantic';
import {Container, Grid, Icon, List} from 'semantic-ui-react';
import MenuLink from 'components/atoms/MenuLink';
import Logo from 'components/atoms/Logo';
import DesktopMenu from 'components/molecules/DesktopMenu';
import MobileMenu from 'components/molecules/MobileMenu';
import React from 'react';

const MenuContainer = glamorous.div({
  backgroundColor: theme.darkRed,
  color: white,
  display: 'flex',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  zIndex: '450',
  overflow: 'visible',
  boxShadow: '0 0 16px rgba(0,0,0,.3)',
});

const menu = () => (
  <MenuContainer>
    <Container>
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </Container>
  </MenuContainer>
);

export default menu;
