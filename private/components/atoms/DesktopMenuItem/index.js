// @flow
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import {Container, Grid, Icon, List} from 'semantic-ui-react';
import MenuLink from 'components/atoms/MenuLink';
import React from 'react';


const MenuListItem = glamorous.li({
  display: 'inline',
});


const menuItem = (props: Object) => {
  let children = {};
  let hasSubMenu = false;
  if (props.menu.children) {
    children = props.menu.children.map(item => (
      <List.Item>
        <List.Content>
          <a href={item.link}>
            <Icon name={item.icon} />
            Country Profiles
          </a>
        </List.Content>
      </List.Item>));
    children = <List>{children}</List>;
    hasSubMenu = true;
  }
  return (<MenuListItem>
    <MenuListItem>
      <MenuLink menu="Global Picture" link="/" hasSubMenu={hasSubMenu}>
        {children}
      </MenuLink>
    </MenuListItem>
  </MenuListItem>);
};

export default menuItem;
