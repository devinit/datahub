// @flow
import glamorous, {Li} from 'glamorous';
import {white} from 'components/theme/semantic';
import {Container, Grid, Icon, List} from 'semantic-ui-react';
import MenuLink from 'components/atoms/MenuLink';
import React from 'react';

const menuItem = (props: Object) => {
  let children = {};
  let hasSubMenu = false;
  if ('children' in props.menu) {
    children = props.menu.children.map(item => (
      <List.Item key={item.name}>
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
    <Li display={'inline'}>
      <MenuLink menu={props.menu.name} link={props.menu.link} hasSubMenu={hasSubMenu}>
        {children}
      </MenuLink>
    </Li>);
};

export default menuItem;
