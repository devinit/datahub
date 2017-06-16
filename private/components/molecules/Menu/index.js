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
  listStyleType: 'none',
  float: 'right',
  margin: '0',
});
const MenuListItem = glamorous.li({
  display: 'inline',
});


const footer = () => (
  <MenuContainer>
    <Container>
      <Logo />
      <ListContainer>
        <MenuListItem><MenuLink menu="Global Picture" /></MenuListItem>
        <MenuListItem>
          <MenuLink menu="Profiles" icon="pie graph" hasSubMenu>
            <List floated="left">
              <List.Item>
                <List.Content><Icon name="area graph" />Country Profiles</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="area graph" />
                <List.Content><Icon name="area graph" />Multilateral Profiles</List.Content>
              </List.Item>
            </List>
          </MenuLink>
        </MenuListItem>
        <MenuListItem><MenuLink menu="Unnbuling aid" /></MenuListItem>
        <MenuListItem><MenuLink menu="Spotlight on Uganda" /></MenuListItem>
        <MenuListItem>
          <MenuLink menu="Other Visualizations" icon="pie graph" hasSubMenu>
            <List>
              <List.Item>
                <List.Content>
                  <Icon name="barcode" />
                  Unbundling other official flows</List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <Icon name="users" />
                  Where are the poor and where will they be?</List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated="left">
                  <Icon name="area graph" />
                  Are domestic public resources able to meet the needs of the poorest people?
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <Icon name="area graph" />
                  Different providers, different priorities
                </List.Content>
              </List.Item>
            </List>
          </MenuLink>
        </MenuListItem>
        <MenuListItem><MenuLink menu="Methodology" /></MenuListItem>
      </ListContainer>
    </Container>
  </MenuContainer>
);

export default footer;
