import { Li } from 'glamorous';
import { Icon, List } from 'semantic-ui-react';
import MenuLink from '../MenuLink';
import Link from 'next/link';
import * as React from 'react';

export interface Props {
  menu: any;
}

const menuItem = (props: Props) => {
  let menuLinkChildren; // TODO: Try to assign correct type
  let hasSubMenu = false;
  if ('children' in props.menu) {
    const childrenList = props.menu.children.map(item =>
      (<List.Item key={item.name}>
        <List.Content>
          <Link href={item.link} prefetch>
            <a role="link">
              <Icon name={item.icon} />
              {item.name}
            </a>
          </Link>
        </List.Content>
      </List.Item>),
    );
    menuLinkChildren = (
      <List>
        {childrenList}
      </List>
    );
    hasSubMenu = true;
  }
  return (
    <Li display={'inline'}>
      <MenuLink menu={props.menu.name} link={props.menu.link} hasSubMenu={hasSubMenu}>
        {menuLinkChildren}
      </MenuLink>
    </Li>
  );
};

export default menuItem;
