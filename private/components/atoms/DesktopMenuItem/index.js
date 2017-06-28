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
  if ('children' in props.menu) {
    children = props.menu.children.map(item => (
      <List.Item>
        <List.Content>
          <a href={item.link}>
            <Icon name={item.icon} />
            {item.name}
          </a>
        </List.Content>
      </List.Item>));
    children = <List>{children}</List>;
    hasSubMenu = true;
  }
  return (
    <MenuListItem>
      <MenuLink menu={props.menu.name} link={props.menu.link} hasSubMenu={hasSubMenu}>
        {children}
      </MenuLink>
    </MenuListItem>);
};

export default menuItem;
