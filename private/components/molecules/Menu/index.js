import glamorous from 'glamorous';
import theme from 'components/theme';
import {Container, Grid} from 'semantic-ui-react';
import {MenuLink} from 'components/atoms/Link';
import React from 'react';


const MenuContainer = glamorous.div({
  backgroundColor: theme.red,
  color: theme.plainWhite,
  display: 'flex',
});
const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: theme.plainWhite,
  alignSelf: 'flex-end',
  listStyleType: 'square',
  float: 'right',
});
const MenuListItem = glamorous.li({
  display: 'inline',
  float: 'left',
  overflow: 'visible',
  paddingTop: '5px',
  paddingBottom: '5px'
});


const footer = () => (
  <MenuContainer>
    <Container>
      <ListContainer>
        <MenuListItem><MenuLink href="">Global Picture</MenuLink></MenuListItem>
        <MenuListItem><MenuLink href="">Profile</MenuLink></MenuListItem>
        <MenuListItem><MenuLink href="">Unbundling aid</MenuLink></MenuListItem>
        <MenuListItem><MenuLink href="">Spotlight On Uganda</MenuLink></MenuListItem>
        <MenuListItem><MenuLink href="">Other Visualisations</MenuLink></MenuListItem>
        <MenuListItem><MenuLink href="">Methodology</MenuLink></MenuListItem>
      </ListContainer>
    </Container>
  </MenuContainer>
);

export default footer;
