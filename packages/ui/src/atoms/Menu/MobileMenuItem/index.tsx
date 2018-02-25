import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';
import * as React from 'react';
import { lightGrey, black } from '../../../theme/semantic';
import {MenuItem} from '../../../molecules/Menu/types';
import {IProcess} from '@devinit/dh-base/lib/types';

declare var process: IProcess;

const Link = process.env && process.env.config && process.env.config.NEXT ? require('next/link') : null;

const SubMenuContainer = glamorous.ul({
  'listStyleType': 'none',
  'color': black,
  'margin': 0,
  'padding': 0,
  '& li': {
    padding: '1rem 1.6rem',
    borderBottom: ` 1px solid ${lightGrey}`,
  },
});

export interface Props {
  menu: MenuItem;
}

const menuItem = (props: Props) => {
  let childrenContainer;
  if (props.menu.children) {
    const children = props.menu.children.map(item =>
      (<li key={item.name}>
        {Link ?
          <Link href={item.link || '/'} prefetch>
           <a role="link">
            <Icon name={item.icon} />
            {item.name}
          </a>;
         </Link> :
          <a href={item.link || '/'}>
            <Icon name={item.icon} />
          {item.name}
          </a>
        }
      </li>)
    );
    childrenContainer = (
      <SubMenuContainer>
        {children}
      </SubMenuContainer>
    );
  }
  return (
    <div className="nav-children">
      {childrenContainer}
    </div>
  );
};

export default menuItem;
