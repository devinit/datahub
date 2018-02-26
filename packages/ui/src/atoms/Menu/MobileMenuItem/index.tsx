import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';
import * as React from 'react';
import { lightGrey, black } from '../../../theme/semantic';
import {MenuItem} from '../../../molecules/Menu/types';
import {LinkState} from 'next/link';

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
  nextLink?: React.ComponentClass<LinkState>;
}

const menuItem = (props: Props) => {
  let childrenContainer;
  if (props.menu.children) {
    const children = props.menu.children.map(item =>
      (<li key={item.name}>
        {props.nextLink ?
          <props.nextLink href={item.link || '#'} prefetch>
           <a role="link">
              <Icon name={item.icon} />
              {item.name}
          </a>
         </props.nextLink> :
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
