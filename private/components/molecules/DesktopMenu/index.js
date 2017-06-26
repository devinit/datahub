import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {Container, Grid, Icon, List} from 'semantic-ui-react';
import MenuLink from 'components/atoms/MenuLink';
import React from 'react';


const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'none',
  float: 'right',
  margin: '0',
  '@media(max-width: 960px)': {
    display: 'none',
  }
});
const MenuListItem = glamorous.li({
  display: 'inline',
});


const menu = () => (
  <ListContainer>
    <MenuListItem><MenuLink menu="Global Picture" link="/" /></MenuListItem>
    <MenuListItem>
      <MenuLink menu="Profiles" icon="pie graph" hasSubMenu>
        <List floated="left">
          <List.Item>
            <List.Content><Icon name="area graph" link="/country-profiles" />Country Profiles</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><Icon name="area graph" link="/#multilateral-profiles" />Multilateral Profiles</List.Content>
          </List.Item>
        </List>
      </MenuLink>
    </MenuListItem>
    <MenuListItem><MenuLink menu="Unnbuling aid" link="/unbundling-aid" /></MenuListItem>
    <MenuListItem><MenuLink menu="Spotlight on Uganda" link="/spotlight-on-uganda" /></MenuListItem>
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
    <MenuListItem><MenuLink menu="Methodology" link="/methodology" /></MenuListItem>
  </ListContainer>
);

export default menu;
