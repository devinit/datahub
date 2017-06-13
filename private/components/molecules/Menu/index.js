import glamorous from 'glamorous';
import theme from 'components/theme';
import {white} from 'components/theme/semantic';
import {Container, Grid} from 'semantic-ui-react';
import MenuLink from 'components/atoms/MenuLink';
import Logo from 'components/atoms/Logo';
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
const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'square',
  float: 'right',
  margin: '0',
});
const MenuListItem = glamorous.li({
  display: 'inline',
  float: 'left',
});


const footer = () => (
  <MenuContainer>
    <Container>
      <Logo />
      <ListContainer>
        <MenuListItem><MenuLink menu="Global Picture">Child</MenuLink></MenuListItem>
        <MenuListItem><MenuLink menu="Global Picture">Child</MenuLink></MenuListItem>
      </ListContainer>
    </Container>
  </MenuContainer>
);

export default footer;
