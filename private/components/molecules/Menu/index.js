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
        <MenuListItem><MenuLink menu="Global Picture" /></MenuListItem>
        <MenuListItem>
          <MenuLink menu="Profiles" icon="pie graph" hasSubMenu>
            <List>
              <List.Item>
                <List.Icon name="area graph" />
                <List.Content>Country Profiles</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="area graph" />
                <List.Content>Multilateral Profiles</List.Content>
              </List.Item>
            </List>
          </MenuLink>
        </MenuListItem>
        <MenuListItem><MenuLink menu="Unnbuling aid" /></MenuListItem>
        <MenuListItem><MenuLink menu="Spotlingt on Uganda" /></MenuListItem>
        <MenuListItem>
          <MenuLink menu="Other Visualizations" icon="pie graph" hasSubMenu>
            <List>
              <List.Item>
                <List.Icon name="barcode" />
                <List.Content>Unbundling other official flows</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="users" />
                <List.Content> Where are the poor and where will they be?</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="area graph" />
                <List.Content>
                  Are domestic public resources able to meet the needs of the poorest people?
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="area graph" />
                <List.Content>
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
