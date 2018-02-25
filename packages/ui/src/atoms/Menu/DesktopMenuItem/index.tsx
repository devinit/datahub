import { Li } from 'glamorous';
import { Icon, List } from 'semantic-ui-react';
import MenuLink from '../MenuLink';
import {MenuItem} from '../../../molecules/Menu/types';
import {IProcess} from '@devinit/dh-base/lib/types';

declare var process: IProcess;

const Link = process.env && process.env.config && process.env.config.NEXT ? require('next/link') : null;

import * as React from 'react';

export interface Props {
  menu: MenuItem;
}

const menuItem = (props: Props) => {
  let menuLinkChildren; // TODO: Try to assign correct type
  let hasSubMenu = false;
  if (props.menu.children) {
    const childrenList = props.menu.children.map(item =>
      (<List.Item key={item.name}>
        <List.Content>
          {Link ?
            <Link href={item.link} prefetch>
              <a role="link" >
                <Icon name={item.icon} />
              {item.name}
            </a>;
            </Link> :
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