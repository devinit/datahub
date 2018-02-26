import * as React from 'react';
import { Li } from 'glamorous';
import { Icon, List } from 'semantic-ui-react';
import {LinkState} from 'next/link';
import MenuLink from '../MenuLink';
import {MenuItem} from '../../../molecules/Menu/types';

export interface Props {
  menu: MenuItem;
  nextLink?: React.ComponentClass<LinkState>;
}

const menuItem = (props: Props) => {
  let menuLinkChildren; // TODO: Try to assign correct type
  let hasSubMenu = false;
  if (props.menu.children) {
    const childrenList = props.menu.children.map(item =>
      (<List.Item key={item.name}>
        <List.Content>
          {props.nextLink ?
            <props.nextLink href={item.link} prefetch>
                <a role="link">
                  {item.name}
                  <Icon name={item.icon} />
                </a>
            </props.nextLink> :
             <a href={item.link} >
              <Icon name={item.icon} />
              {item.name}
            </a>
        }
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
      <MenuLink menu={props.menu.name} link={props.menu.link || ''} hasSubMenu={hasSubMenu}>
        {menuLinkChildren}
      </MenuLink>
    </Li>
  );
};

export default menuItem;
