import glamorous from 'glamorous';
import { white, red } from 'components/theme/semantic';
import { Container } from 'semantic-ui-react';
import Logo from 'components/atoms/Logo';
import DesktopMenu from 'components/molecules/DesktopMenu';
import MobileMenu from 'components/molecules/MobileMenu';
import React from 'react';

const MenuContainer = glamorous.div({
  backgroundColor: red,
  color: white,
  display: 'flex',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  zIndex: '450',
  overflow: 'visible',
  boxShadow: '0 0 16px rgba(0,0,0,.3)', // TODO:add to color variables
});

const menu = props =>
  (<MenuContainer>
    <Container>
      <Logo />
      <DesktopMenu {...props} />
      <MobileMenu {...props} />
    </Container>
  </MenuContainer>);

export default menu;
