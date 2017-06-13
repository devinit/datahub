import glamorous from 'glamorous';
import theme from 'components/theme';
import {white} from 'components/theme/semantic';
import {Container, Grid, Icon, List} from 'semantic-ui-react';
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
        <MenuListItem><MenuLink icon="browser" hasSubMenu menu="Global Picture">
          <List>
            <List.Item>
              <List.Icon name="users" />
              <List.Content>Child One</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="barcode" />
              <List.Content>Child Two</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="mail" />
              <List.Content>
                Child Three
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                Child Four
              </List.Content>
            </List.Item>
          </List>
        </MenuLink></MenuListItem>
        <MenuListItem><MenuLink menu="Global Picture" /></MenuListItem>
      </ListContainer>
    </Container>
  </MenuContainer>
);

export default footer;
